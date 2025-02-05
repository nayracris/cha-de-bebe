/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        playwriteIN: ["Playwrite IN", "serif"], // Nome da fonte correta
      },
      colors: {
        opaque: {
          400: "rgba(255, 255, 255, 0.4)",
          500: "rgba(255, 255, 255, 0.5)",
          600: "rgba(255, 255, 255, 0.6)",
          700: "rgba(255, 255, 255, 0.7)",
          800: "rgba(255, 255, 255, 0.8)",
        },
        "silver-opaque": {
          500: "rgb(212, 212, 216, 0.5)",
        },
        custom: {
          teal: "#96bebd", // Tom de azul-esverdeado
          deepBlue: "#00486b", // Azul escuro
          lightGray: "#c1c1c1", // Cinza claro
          paleBlue: "#c4d6da", // Azul pálido
          softGray: "#e6e6e6", // Cinza suave
        },
      },
      keyframes: {
        "grow-up": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "grow-up": "grow-up 0.4s ease-in-out",
        loading: "loading 0.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
