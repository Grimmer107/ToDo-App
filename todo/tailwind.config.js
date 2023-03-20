/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#272851',
        'background': '#31315c',
        'secondary': '#3f78b2',
        'item': '#43446a'
      },
      height: {
        "screenset": "90vh"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
