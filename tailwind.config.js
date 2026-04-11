/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './site.config.js',
  ],
  theme: {
    extend: {
      colors: {
        // Primary (dark coffee)
        primary: '#2b1e16',
        'primary-light': '#4a3426',

        // Secondary (mid brown)
        secondary: '#8b5e3c',

        // Accent (coffee orange)
        accent: '#c26a2e',
        'accent-light': '#e08a4e',

        // Backgrounds
        bg: '#f5e9dc',
        'bg-alt': '#faf6f1',

        // Surfaces
        surface: '#ebd8c3',
        'surface-muted': '#f1e4d6',

        // Text
        text: '#2b1e16',
        'text-muted': '#6b4f3a',
        'text-light': '#a68a73',

        // States
        success: '#2e7d32',
        'success-bg': '#e6f4ea',
        destructive: '#c62828',
        'destructive-bg': '#fdecea',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
};
