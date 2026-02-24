import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        light: { 100: "fff", 400: "#f5f5f5" },
        gold: { 400: "#c9a962", 500: "#a38d6d", 600: "#8a7557" },
        dark: {
          900: "#0a0a0a",
          800: "#141414",
          700: "#1a1a1a",
          600: "#252525",
          500: "#333",
        },
        success: "#4ecca3",
        danger: "#e85d75",
      },
    },
  },
  important: "#root",
  plugins: [],
} satisfies Config;
