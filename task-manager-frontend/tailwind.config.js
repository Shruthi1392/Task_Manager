/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./app/**/*.{js,jsx,ts,tsx}",       // all files in app/ and subfolders
    "./components/**/*.{js,jsx,ts,tsx}", // if you move components out later
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

