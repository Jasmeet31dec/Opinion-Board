/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#f9f7f3",
        "custom-heading": "#2e2923",
        "custom-button": "#fd9217",
        "custom-button-hover": "#e6830f",
      },
    },
  },
  plugins: [],
};
