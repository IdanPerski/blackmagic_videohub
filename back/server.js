const express = require("express");
const cors = require("./middlewares/cors");
const txtColor = require("./helpers/chalk/color");
const { createServer } = require("http");
const socketIo = require("socket.io");
const path = require("path");
const {
  handleTcpConnection,
  routeFromClient,
} = require("./videohub/videohubService");
// const handleTcpConnection = require("./videohub/videohubService");
// const routeFromClient = require("./videohub/videohubService");
const HTTP_PORT = 8080;

const app = express();
app.use(express.static("public"));
app.use(cors);
const httpServer = createServer(app);
const io = socketIo(httpServer);

// Serve the index.html file
app.use(express.static(path.join(__dirname, "../front")));
//Handle tcp socket and socket io to client
// handleTcpConnection(io);

httpServer.listen(HTTP_PORT, () => {
  console.log(txtColor.lemon(`Server is listening on port ${HTTP_PORT}`));
});

// Handle socket connections

const ioSocketConnection = () => {
  io.on("connection", (socket) => {
    console.log(txtColor.safe("client connected"));
    console.log(socket.connected);
    console.log(socket.id);

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
      // routeFromClient(data.command);
      // Do something with the received data
    });

    socket.on("sync", (sync) => {
      console.log("sync clicked", sync);
      // handleTcpConnection(io, sync.hostIpAddress, sync.port);
      handleTcpConnection(io, sync.hostIpAddress, sync.port);
    });
  });
};

ioSocketConnection();
