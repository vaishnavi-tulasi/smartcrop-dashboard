/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        "float-in-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "float-in-up": "float-in-up 600ms ease-out both",
      },
    },
  },
  plugins: [],
};

