module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        pig: "#EF8784",
        pink: {
          300: "#ff52a5",
          400: "#ff409c",
          500: "#FF3B9A",
          600: "#db3083",
          700: "#bd246e",
          800: "#a1185a",
          900: "#820c45",
        },
        rare: "#EB4C27",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
