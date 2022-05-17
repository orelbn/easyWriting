module.exports = {
  mode: "jit",
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    screens: {
      xsm: "564px",
      // => @media (min-width: 564px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      spacing: {
        128: "32rem",
      },
    },
  },
  varaint: {},
  plugins: [require("@tailwindcss/forms")],
};
