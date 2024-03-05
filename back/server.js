const express = require("express");
const cors = require("./middlewares/cors");
const txtColor = require("./helpers/chalk/color");
const socketIo = require("socket.io");
const path = require("path");
const {
  handleTcpConnection,
  routeFromClient,
} = require("./videohub/videohubService");
const myLogger = require("./log/myLogger");
const HTTP_PORT = 8080;

const app = express();

app.use(cors);

// Serve the index.html file
app.use(express.static(path.join(__dirname, "../front")));

const expresServer = app.listen(HTTP_PORT, () => {
  console.log(txtColor.lemon(`Server is listening on port ${HTTP_PORT}`));
});

const io = socketIo(expresServer);

// Handle socket connections

const ioSocketConnection = () => {
  io.on("connection", (socket) => {
    console.log(txtColor.safe("client connected"));
    console.log(socket.connected);
    let sessionId = socket.id;

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log(txtColor.danger("A client disconnected"));
      console.log(socket.id);
      console.log(socket.connected);
    });

    // Handle custom events from the client
    socket.on("singleRouth", (data) => {
      console.log(txtColor.danger("Received data from client:"), data);
      console.log(data.command);
      routeFromClient(data.command);
      myLogger(socket.id, data);
    });

    socket.on("sync", (sync) => {
      console.log("sync clicked", sync);
      // handleTcpConnection(io, sync.hostIpAddress, sync.port);
      handleTcpConnection(io, sync.hostIpAddress, sync.port, sessionId);
    });
  });
};

ioSocketConnection();
