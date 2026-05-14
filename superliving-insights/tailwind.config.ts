import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["DM Mono", "monospace"],
        display: ["Cabinet Grotesk", "system-ui"],
        sans: ["DM Sans", "system-ui"],
      },
    },
  },
  plugins: [animate],
};

export default config;
