/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
      primary: '#47ab7c',
      secondary: '#87d196',
      accent: '#e6817b',
      dark: '#1e293b',
      light: '#e7fbef'
      }
    },
  },
  plugins: [],
}