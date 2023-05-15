/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          dark: "#5538EE",
          DEFAULT: "#6B4EFF",
          light: "#9990FF",
          lighter: "#C6C4FF",
          lightest: "#E7E7FF",
        },
        red: {
          dark: "#D3180C",
          DEFAULT: "#FF5247",
          light: "#FF6D6D",
          lighter: "#FF9898",
          lightest: "#FFE5E5",
        },
      },
    },
  },
  plugins: [],
};
