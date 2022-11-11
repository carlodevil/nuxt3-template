/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./assets/**/*.{css}",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  content: [],
  theme: {
    extend: {
      green: {
        DEFAULT: "#29A69F",
        50: "#E9FAF9",
        100: "#D0F3F2",
        200: "#9FE7E3",
        300: "#6EDBD5",
        400: "#3DCFC7",
        500: "#29A69F",
        600: "#20817C",
        700: "#175C58",
        800: "#0E3835",
        900: "#051312",
      },
    },
  },
  plugins: [],
}
