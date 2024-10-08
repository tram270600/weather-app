/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#6C40B5",
        },
        grey: {
          500: "#666666",
        },
      },
      backgroundImage: {
        "weather-pattern-light": "url('../src/assets/bg-light.png')",
      },
    },
  },
  plugins: [],
};
