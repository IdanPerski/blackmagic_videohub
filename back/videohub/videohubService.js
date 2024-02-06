const net = require("net");
const txtColor = require("../helpers/chalk/color");
const videohub = new net.Socket();
const TCP_PORT = 9990;
const TCP_HOST = "192.168.200.20";
let videohubData;

const handleTcpConnection = (ioSocket, host, port) => {
  console.log("handleTcpConnection is runing");

  const videohubUpdate = (tcp_client) => {
    tcp_client.on("data", (data) => {
      console.log(data.length, "!!!!!!!");
      if (data.length <= 29) {
        console.log(
          txtColor.lemon("videohub routing updated", data.toString()),
        );
        ioSocket.emit("videoHubRoute", data);
        return;
      }

      videoHubData = data;
      console.log(txtColor.warning(videohubData));
      console.log(txtColor.safe("videohub data sent to client"));
      ioSocket.emit("videoHubData", data);
    });
  };

  videohub.on("error", (error) => {
    console.log(txtColor.danger("ERROR:"), error);
    if (error.code === "ETIMEDOUT") {
      console.log(
        txtColor.danger(
          `Connection timed out. Check your network connection ${host}:${port}`,
        ),
      );
      ioSocket.on("end", function () {
        ioSocket.disconnect(0);
      });
      ioSocket.emit("VideohubTimeout", error);
    } else if (error.code === "EINVAL") {
      console.log(txtColor.danger("Invalid argument error"));
      videohub.destroy();
      console.log("DISCONNECTED!!!!!!");
      // ioSocket.close();
      // ioSocket.disconnectSockets();
    }
  });
  videohub.connect(port, host, () => {
    console.log(txtColor.lemon(`connected to ${host}:${port}`));

    videohubUpdate(videohub);
    //transfer videohub data thru socket io
    ioSocket.on("connection", (socket) => {
      socket.emit("videoHubData", videoHubData);
    });
  });
};

const routeFromClient = (dataFromClient) => {
  console.log("routeFromClient ON!", dataFromClient);
  videohub.write(dataFromClient);
};

module.exports = {
  handleTcpConnection: handleTcpConnection,
  routeFromClient: routeFromClient,
};
