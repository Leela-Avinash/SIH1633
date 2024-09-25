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
        primary:'#F9FCFD',
        secondary:'#07A4B5',
        tertiary:'#C9EFF9',
        fourty:'#FED8A7',
        custombg:'#ededeb',
      },
      fontSize:{
        'tiny':'0.70rem',
      },
      width:{
        '74':'18.5rem',
      },
      height:{
        '22':'5.5rem',  
      },
      fontFamily:{
        'mono':['Lato'],
      },
    },
  },
  plugins: [],
}