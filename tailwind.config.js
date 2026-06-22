/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554",
          DEFAULT: "#1D4ED8",
        },
        navy: {
          50: "#F0F4FF",
          100: "#E0E9FF",
          500: "#3B5BDB",
          700: "#1A2F6B",
          800: "#0F1F4D",
          900: "#0A1628",
          DEFAULT: "#0F1F4D",
        },
        teal: {
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          DEFAULT: "#14B8A6",
        },
        surface: "#F8FAFF",
        card: "#FFFFFF",
        border: "#E2E8F0",
        muted: "#94A3B8",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#06B6D4",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
