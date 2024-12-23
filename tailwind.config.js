/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        header: "28px",
      },
      colors: {
        primary: "#0074E8", // Custom primary color
        secondary: "#B0D7FF", // Custom secondary color
        accent: "#FBBF24", // Custom accent color
        active: "#00FF00",
        danger: "#FF0000",
        pending: "#FFFF00",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
