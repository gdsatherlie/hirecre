import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9",
          dark: "#0284C7"
        },
        surface: {
          light: "#0f172a",
          dark: "#0b1224"
        }
      },
      boxShadow: {
        card: "0 10px 40px rgba(0,0,0,0.3)"
      }
    }
  },
  plugins: []
};

export default config;
