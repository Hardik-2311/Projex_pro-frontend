/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      'heading':'"Lobster Two", sans-serif',
      'sub-heading':'"Montserrat", sans-serif;'
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
};