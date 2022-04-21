module.exports = {
  async rewrites() {
    return [
      {
        source: "/test",
        destination: "http://google.com",
      },
    ];
  },
};
