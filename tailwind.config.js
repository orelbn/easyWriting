module.exports = {
  mode: "jit",
  content: ["./src/**/*.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xsm: "564px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fadeIn-response": "fadeIn 1s linear running",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  varaint: {},
  plugins: [require("@tailwindcss/forms")],
};
