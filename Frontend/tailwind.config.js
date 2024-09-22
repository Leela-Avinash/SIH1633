/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom1':'#0066cc',
        'custombg':'#ededeb',
      }
    },
  },
  plugins: [],
}
