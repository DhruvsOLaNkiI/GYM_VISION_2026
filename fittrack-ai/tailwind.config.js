/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        fittrack: {
          bg: "#1A0A2E",
          card: "#2D1B4E",
          "card-light": "#3D2B5E",
          accent: "#7C3AED",
          "accent-light": "#9B5DE5",
          gold: "#F59E0B",
          green: "#16A34A",
          "text-primary": "#FFFFFF",
          "text-secondary": "#A78BFA",
          "text-muted": "#6B5B95",
          success: "#22C55E",
          warning: "#F97316",
          danger: "#EF4444",
          "tab-inactive": "#6B5B95",
          "tab-active": "#A78BFA",
        },
      },
      fontFamily: {
        "heading": ["BebasNeue"],
        "body": ["DMSans-Regular"],
        "body-medium": ["DMSans-Medium"],
        "body-bold": ["DMSans-Bold"],
      },
    },
  },
  plugins: [],
};
