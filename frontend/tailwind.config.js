/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      width: {
        '768': '768px',
      },
      height: {
        '432': '432px',
      },
    },
  },
  plugins: [],
}