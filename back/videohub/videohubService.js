const net = require("net");
const txtColor = require("../helpers/chalk/color");
const videohub = new net.Socket();
const TCP_PORT = 9990;
const TCP_HOST = "192.168.200.20";
let videohubData;
const handleTcpConnection = (ioSocket) => {
  console.log("handleTcpConnection is runing");

  const videohubUpdate = (tcp_client) => {
    tcp_client.on("data", (data) => {
      if (data.length === 27) {
        console.log(
          txtColor.lemon("videohub routing updated", data.toString())
        );
        ioSocket.emit("videoHubRoute", data);
        return;
      }
      videoHubData = data;
      console.log(txtColor.safe("videohub data sended to client"));
      ioSocket.emit("videoHubData", data);
    });
  };

  videohub.on("error", (error) => {
    console.log(txtColor.danger("ERROR:"), error);
    if (error.code === "ETIMEDOUT") {
      console.log(
        txtColor.danger(
          `Connection timed out. Check your network connection ${TCP_HOST}:${TCP_PORT}`
        )
      );
    }
    handleTcpConnection(ioSocket);
  });
  videohub.connect(TCP_PORT, TCP_HOST, () => {
    console.log(txtColor.lemon(`connected to ${TCP_HOST}:${TCP_PORT}`));

    videohubUpdate(videohub);
    //transfer videohub data thru socket io
    ioSocket.on("connection", (socket) => {
      socket.emit("videoHubData", videoHubData);
    });
  });
};

module.exports = handleTcpConnection;
