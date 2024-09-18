/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        custom1:'#0059b3',
        custom2:'#66b2ff',
        bgcol1:'#ffffff',
        bgcol2:'#e6f2ff',
        bgcol3:'#cce6ff',
        
      },
    },
  },
  plugins: [],
}
