/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        nunito: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      colors: {
        forest: {
          50:  "#eef5f0",
          100: "#d5e9db",
          300: "#7db899",
          500: "#3a7a58",
          700: "#1e4a38",
          900: "#0d2419",
        },
        amber: {
          400: "#e8a93a",
          500: "#c8912a",
          600: "#a87220",
        },
        parchment: {
          50:  "#f8f5ef",
          100: "#f0ebe0",
          200: "#e4ddd0",
        },
      },
    },
  },
  plugins: [],
};
