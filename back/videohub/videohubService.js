const net = require("net");
const colors = require("../helpers/chalk/color");
const VIDEOHUB_IP_ADDRESS = "192.168.200.20";
const VIDEOHUB_PORT = 9990;

const videohubClient = new net.Socket();

videohubClient.connect(
  { port: VIDEOHUB_PORT, host: VIDEOHUB_IP_ADDRESS },
  () => {
    console.log(colors.safe("Connected to Videohub Server"));
  },
);

const getVideohubData = (callback) => {
  videohubClient.on("data", (data) => {
    const videohubData = data.toString();
    callback(videohubData);
  });
};
// const handleVideohubData = (data) => {
//   // Use the parsed data or perform other actions
//   console.log("Received data:", data);
// };

// const parseVideohubData = () => {
//   const data = getVideohubData();
//   //   const lines = data.split("\n");
//   //   lines.forEach((line) => {
//   //     // Process each line
//   //   });
// };

module.exports = getVideohubData;
