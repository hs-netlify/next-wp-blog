module.exports = {
  async redirects() {
    return [
      {
        source: "/test",
        destination: "http://google.com",
        permanent: true,
      },
    ];
  },
};
