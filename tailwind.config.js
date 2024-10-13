/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
      },
      colors: {
        'custom-blue': 'rgb(30, 82, 104)',
        'custom-blue1': 'rgb(41,131,167)'

      },

    },
  },
  
  plugins: [],
}
