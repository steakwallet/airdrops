module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        pig: "#EF8784",
        pink: "#FF3B9A",
        "light-pink": "#fa78b7",
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
