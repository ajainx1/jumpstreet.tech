import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        primary: "var(--primary)",
        "primary-glow": "var(--primary-glow)",
        "bg-base": "var(--bg)",
        "bg-card": "var(--card)",
        "fg-base": "var(--fg)",
        muted: "var(--muted)",
        "border-base": "var(--border)",
        "border-heavy": "var(--border2)",
        "amber-accent": "var(--amber)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        title: ["var(--font-title)"],
        mono: ["var(--font-mono)"],
      }
    },
  },
  plugins: [],
};
export default config;
