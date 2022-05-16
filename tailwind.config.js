module.exports = {
  mode: "jit",
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    screens: {
      xsm: "564px",
    },
    extend: {
      height: {
        128: "32rem",
      },
    },
  },
  varaint: {},
  plugins: [require("@tailwindcss/forms")],
};
