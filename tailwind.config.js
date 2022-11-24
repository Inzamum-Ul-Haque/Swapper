/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#0FAEEF",
          secondary: "#1E3A8A",
        },
      },
    ],
  },
};
