module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/rock-climbing-g6517e0584_1920.jpg')",
      },
      background: {
        "hero-grad":
          "linear-gradient(0deg, rgba(255, 0, 150, 0.3), rgba(255, 0, 150, 0.3)), url(/rock-climbing-g6517e0584_1920.jpg)",
      },
    },
  },
  plugins: [],
};
