/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8c52ff'
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0)'},
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        grow: 'grow 400ms ease-out',
      }
    },
  },
  plugins: [],
}
