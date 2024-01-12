const colors = require("../helpers/chalk/color");

const customSocket = (socket) => {
  console.log(colors.danger("socketToclient"));
  socket.on("connection", (data) => {
    console.log(colors.danger("____________________________________________"));
    console.log("Received video hub data:", data.id);
    // Do something with the received data
  });
};

module.exports = customSocket;
