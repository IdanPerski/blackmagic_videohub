const express = require("express");
const cors = require("./middlewares/cors");
const txtColor = require("./helpers/chalk/color");
const getVideohubData = require("./videohub/videohubService");
const colors = require("./helpers/chalk/color");
const parseVideohubData = require("./videohub/helpers/parseVideohubData");
const { Server } = require("socket.io");
const { createServer } = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
const customSocket = require("./socket_io/customSocket");

const PORT = 8080;

const app = express();
app.use(express.static("public"));
app.use(cors);
const httpServer = createServer(app);
const io = socketIo(httpServer);

// Serve the index.html file
app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle socket connections
io.on("connection", (socket) => {
  socket;
  console.log(colors.danger("A client connected"));

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(colors.danger("A client disconnected"));
  });

  // Handle custom events from the client
  socket.on("clientEvent", (data) => {
    console.log(colors.danger("Received data from client:", data));
    // Do something with the received data
  });
});
// customSocket(io);

getVideohubData((data) => {
  console.log(colors.lemon("current video hub data:", "data"));
  const parsedData = parseVideohubData(data);
  io.emit("videohubData", parsedData);
});

httpServer.listen(PORT, () => {
  console.log(txtColor.lemon(`Server is listening on port ${PORT}`));
});
