/**
 * @typedef {Object} DayHours
 * @property {string} day
 * @property {number} dayIndex
 * @property {string} open
 * @property {string} close
 * @property {boolean} isOpen
 */

const hoursData = [
  { day: 'Monday', dayIndex: 1, open: '7:00', close: '18:00' },
  { day: 'Tuesday', dayIndex: 2, open: '7:00', close: '22:00' },
  { day: 'Wednesday', dayIndex: 3, open: '7:00', close: '18:00' },
  { day: 'Thursday', dayIndex: 4, open: '7:00', close: '18:00' },
  { day: 'Friday', dayIndex: 5, open: '7:00', close: '20:00' },
  { day: 'Saturday', dayIndex: 6, open: '8:00', close: '20:00' },
  { day: 'Sunday', dayIndex: 0, open: '9:00', close: '16:00' },
];

// The cafe's local timezone — all open/closed logic must be evaluated in this zone.
const CAFE_TZ = 'America/New_York';

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Returns the current hours and minutes in the cafe's local timezone,
 * regardless of where the server/browser is running.
 */
function getCafeNow() {
  const now = new Date();
  
  // 1. Convert current UTC time into a string matching New York's exact clock. 
  // 'en-US' guarantees the format "M/D/YYYY, h:mm:ss AM/PM"
  const nyString = now.toLocaleString('en-US', { timeZone: CAFE_TZ });
  
  // 2. Parse that string back into a JS Date. Since the string lacks a timezone 
  // suffix (like GMT), JS assumes it represents the environment's local time.
  // This effectively "tricks" JS into giving us New York's clock values directly.
  const nyDate = new Date(nyString);
    
  const dayIndex = nyDate.getDay();
  const hour = nyDate.getHours();
  const minute = nyDate.getMinutes();
  
  const currentMinutes = hour * 60 + minute;

  return { dayIndex, currentMinutes };
}

export function getTodayHours() {
  const { dayIndex, currentMinutes } = getCafeNow();

  const today = hoursData.find((h) => h.dayIndex === dayIndex);
  const openMinutes = timeToMinutes(today.open);
  const closeMinutes = timeToMinutes(today.close);

  return {
    ...today,
    isToday: true,
    isOpen: currentMinutes >= openMinutes && currentMinutes < closeMinutes,
  };
}

export function isCurrentlyOpen() {
  return getTodayHours().isOpen;
}

export function formatTime12Hour(time) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function getStoreStatus() {
  const { dayIndex, currentMinutes } = getCafeNow();

  const today = hoursData.find((h) => h.dayIndex === dayIndex);
  const openMinutes = timeToMinutes(today.open);
  const closeMinutes = timeToMinutes(today.close);

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { isOpen: true, text: `Open Now – Closes at ${formatTime12Hour(today.close)}` };
  } else if (currentMinutes < openMinutes) {
    return { isOpen: false, text: `Closed – Opens today at ${formatTime12Hour(today.open)}` };
  } else {
    const tomorrowIndex = (dayIndex + 1) % 7;
    const tomorrow = hoursData.find((h) => h.dayIndex === tomorrowIndex);
    return { isOpen: false, text: `Closed – Opens tomorrow at ${formatTime12Hour(tomorrow.open)}` };
  }
}

export const fullHours = hoursData;
