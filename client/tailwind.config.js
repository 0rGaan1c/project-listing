/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.25)",
        categorybox: "0px 0px 17.50510597229004px 0px rgba(0, 0, 0, 0.15)",
      },
    },
    fontFamily: {
      dmsans: "'DM Sans', sans-serif",
    },
  },

  plugins: [],
};
