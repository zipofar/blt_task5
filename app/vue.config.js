const clientPort = process.env.CLIENT_PORT || 3000;
const serverPort = process.env.SERVER_PORT || 4000;

module.exports = {
  devServer: {
    port: clientPort,
    proxy: `http://app_server:${serverPort}`,
  },
};
