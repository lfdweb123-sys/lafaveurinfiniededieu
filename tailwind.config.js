/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#FFFDF5', 500: '#D4A017', 600: '#B8860B', 700: '#8B6914' },
        dark: { 900: '#0A0A0A', 800: '#1A1A2E', 700: '#16213E' }
      }
    }
  },
  plugins: []
}