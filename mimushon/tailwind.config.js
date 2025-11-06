/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Keep this if you have a src folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Add this
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Add this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
