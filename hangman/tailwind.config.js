/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "Dark-Navy": "#261676",
        "Blue": "#2463FF",
      }
    },
    keyframes: {
      "fade-in-out": {
        "0%": { opacity: 0.3 },
        "50%": { opacity: 0.6 },
        "100%": { opacity: 0.3 },
      },
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      }
    },
    animation: {
      "fade-in-out": 'fade-in-out 1s linear infinite',
      "fade-in": 'fade-in 0.3s linear',
    }
  },
  plugins: [],
}