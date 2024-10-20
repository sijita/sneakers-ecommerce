/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#09090b",
          secondary: "#fafafa",
          neutral: "#27272a",

          "base-100": "#09090b",
          "base-200": "#9a9a9a",
          "base-content": "#fafafa",

          info: "#4dbeff",
          success: "#baff29",
          warning: "#feea34",
          error: "#fe2a2a",

          "--rounded-box": "0.375rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.375rem",

          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
        },
      },
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#fff",
          secondary: "#000",
          "secondary-content": "#fff",
          neutral: "#cecece",

          "base-100": "#fff",
          "base-200": "#0d0d0d",
          "base-content": "#000",

          info: "#4dbeff",
          success: "#baff29",
          warning: "#feea34",
          error: "#fe2a2a",

          "--rounded-box": "0.375rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.375rem",

          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
