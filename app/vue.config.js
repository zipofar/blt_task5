const clientPort = process.env.CLIENT_PORT || 3000;
const serverPort = process.env.SERVERP || 4000;

module.exports = {
  devServer: {
    port: clientPort,
    writeToDisk: true,
    proxy: `http://app_server:${serverPort}`,
  },
};
