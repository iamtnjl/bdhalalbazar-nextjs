/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vibes: ["Great Vibes", "cursive"],
      },
      colors: {
        primary: "#0f766e",
        "primary-bg": "#F7FDFC",
        "primary-900": "#0b4f4a",
        "primary-700": "#00786f",
        "primary-600": "#009689",
        "primary-500": "#00bba7",
        "primary-400": "#00d5be",
        "primary-300": "#46ecd5",
        "primary-200": "#90D5D2",
        "primary-100": "#E0F5F4",
        warning: "#E30909",
        "gray-700": "#333333",
        "gray-500": "#666666",
        "gray-400": "#999999",
        "gray-300": "#CCCCCC",
        "gray-200": "#E1E1E1",
        "gray-50": "#FAFAFA",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
