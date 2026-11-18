/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c7dcfe',
          300: '#a3c4fd',
          400: '#75a2fa',
          500: '#437af5',
          600: '#255beb',
          700: '#1d46d8',
          800: '#1e3cb0',
          900: '#1d348a',
          950: '#142054',
        },
        violetAccent: {
          50: '#f6f4fe',
          100: '#ece8fd',
          200: '#dbd4fb',
          300: '#c1b3f7',
          400: '#a288f1',
          500: '#845be9',
          600: '#723ddc',
          700: '#612dc5',
          800: '#5226a3',
          900: '#442185',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [],
}
