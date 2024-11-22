/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        didact: ['"Didact Gothic"', 'sans-serif'], //Add font family
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

