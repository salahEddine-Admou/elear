/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      sans: ['Helvetica Bold', 'Helvetica', 'Arial', 'sans-serif'],

    },
    extend: {
      blur: {
        'sm': '2px', // example of adding a very large blur
        'ultra': '5px' // an even more intense blur
      }
    },
  },
  plugins: [],
}
