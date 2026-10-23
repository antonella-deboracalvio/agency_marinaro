/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        card: "rgb(var(--card-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        primary: "rgb(var(--primary-rgb) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover-rgb) / <alpha-value>)",
        secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground-rgb) / <alpha-value>)",
        silver: "rgb(var(--silver-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong-rgb) / <alpha-value>)",
        destructive: "rgb(var(--destructive-rgb) / <alpha-value>)",
        // Compatibility for older reusable components in this project.
        night: "rgb(var(--background-rgb) / <alpha-value>)",
        stone: "rgb(var(--card-rgb) / <alpha-value>)",
        lime: "rgb(var(--primary-rgb) / <alpha-value>)",
        champagne: "rgb(var(--accent-rgb) / <alpha-value>)",
        violet: "rgb(var(--primary-rgb) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 0 60px rgb(var(--primary-rgb) / .16)",
      },
    },
  },
  plugins: [],
};
