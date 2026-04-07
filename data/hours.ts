export interface DayHours {
  day: string;
  dayIndex: number;
  open: string;
  close: string;
  isOpen: boolean;
}

const hoursData: Omit<DayHours, 'isOpen'>[] = [
  { day: 'Monday', dayIndex: 1, open: '7:00', close: '18:00' },
  { day: 'Tuesday', dayIndex: 2, open: '7:00', close: '22:00' },
  { day: 'Wednesday', dayIndex: 3, open: '7:00', close: '18:00' },
  { day: 'Thursday', dayIndex: 4, open: '7:00', close: '18:00' },
  { day: 'Friday', dayIndex: 5, open: '7:00', close: '20:00' },
  { day: 'Saturday', dayIndex: 6, open: '8:00', close: '20:00' },
  { day: 'Sunday', dayIndex: 0, open: '9:00', close: '16:00' },
];

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function getTodayHours(): Omit<DayHours, 'isOpen'> & { isToday: boolean; isOpen: boolean } {
  const now = new Date();
  const todayIndex = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const today = hoursData.find((h) => h.dayIndex === todayIndex)!;
  const openMinutes = timeToMinutes(today.open);
  const closeMinutes = timeToMinutes(today.close);

  return {
    ...today,
    isToday: true,
    isOpen: currentMinutes >= openMinutes && currentMinutes < closeMinutes,
  };
}

export function isCurrentlyOpen(): boolean {
  return getTodayHours().isOpen;
}

export function formatTime12Hour(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function getStoreStatus() {
  const now = new Date();
  const todayIndex = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const today = hoursData.find((h) => h.dayIndex === todayIndex)!;
  const openMinutes = timeToMinutes(today.open);
  const closeMinutes = timeToMinutes(today.close);

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { isOpen: true, text: `Open Now - Closes at ${formatTime12Hour(today.close)}` };
  } else if (currentMinutes < openMinutes) {
    return { isOpen: false, text: `Closed - Opens today at ${formatTime12Hour(today.open)}` };
  } else {
    const tomorrowIndex = (todayIndex + 1) % 7;
    const tomorrow = hoursData.find((h) => h.dayIndex === tomorrowIndex)!;
    return { isOpen: false, text: `Closed - Opens tomorrow at ${formatTime12Hour(tomorrow.open)}` };
  }
}

export const fullHours = hoursData;
