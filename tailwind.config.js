module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        rubik: "rubik",
      },
      backgroundImage: {
        lightPattern:
          "repeating-linear-gradient(90deg, rgba(198, 198, 198,0.05) 0px, rgba(198, 198, 198,0.05) 1px,transparent 1px, transparent 5px),repeating-linear-gradient(0deg, rgba(198, 198, 198,0.05) 0px, rgba(198, 198, 198,0.05) 1px,transparent 1px, transparent 5px),repeating-linear-gradient(0deg, rgba(198, 198, 198,0.06) 0px, rgba(198, 198, 198,0.06) 1px,transparent 1px, transparent 15px),repeating-linear-gradient(90deg, rgba(198, 198, 198,0.06) 0px, rgba(198, 198, 198,0.06) 1px,transparent 1px, transparent 15px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));",
        darkPattern:
          "repeating-linear-gradient(135deg, hsla(55,0%,44%,0.09) 0px, hsla(55,0%,44%,0.09) 1px,transparent 1px, transparent 11px),repeating-linear-gradient(45deg, hsla(55,0%,44%,0.09) 0px, hsla(55,0%,44%,0.09) 1px,transparent 1px, transparent 11px),linear-gradient(90deg, hsl(22,0%,8%),hsl(22,0%,8%));",
      },
    },
  },
  plugins: [],
};
