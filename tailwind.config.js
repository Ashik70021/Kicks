/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#232321',
          blue: '#4A69E2',
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },

}