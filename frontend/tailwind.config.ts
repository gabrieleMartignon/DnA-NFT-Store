/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5a4",
        secondary: "#00e5ff",
        background: "#ffffff",
        surface: "#f7fafc",
        text: "#0f172a",
      },
    },
  },
  plugins: [[require('tailwind-scrollbar'),require('tailwind-scrollbar-hide')]],
}