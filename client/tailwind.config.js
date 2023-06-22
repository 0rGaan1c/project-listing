/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.25)",
      },
    },
    fontFamily: {
      dmsans: "'DM Sans', sans-serif",
    },
  },

  plugins: [],
};
