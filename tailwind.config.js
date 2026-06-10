/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c6ff7',
        dark: '#0f0f13',
        card: '#161620',
        border: '#1e1e2e',
      },
    },
  },
  plugins: [],
}
