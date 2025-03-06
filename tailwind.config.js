/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#372aac",
        "primary-bg": "#eef2ff",
        "primary-900": "#312c85",
        "primary-700": "#432dd7",
        "primary-600": "#4f39f6",
        "primary-500": "#615fff",
        "primary-400": "#7c86ff",
        "primary-300": "#a3b3ff",
        "primary-200": "#c6d2ff",
        "primary-100": "#e0e7ff",
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
