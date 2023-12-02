/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Slab"],
        logo: ["Kaushan Script"],
      },
      colors: {
        feldgrau: "#3c493f",
        "battleship-grey": "#7E8D85",
        "ash-grey": "#B3BFB8",
        "mint-cream": "#F0F7F4",
        celadon: "#A2E3C4",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "bounce-once": "bounce 1s ease-in-out 1",
        "bounce-twice": "bounce 1s ease-in-out 2",
        hide: "opacity-0 blur-sm -translate-x-full transition-all duration-1000",
        show: "opacity-100 blur-none translate-y-0 transition-all duration-1000",
      },
    },
  },
  plugins: [],
};
