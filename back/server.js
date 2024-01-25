const express = require("express");
const cors = require("./middlewares/cors");
const txtColor = require("./helpers/chalk/color");
const { createServer } = require("http");
const socketIo = require("socket.io");
const path = require("path");
const handleTcpConnection = require("./videohub/videohubService");
const HTTP_PORT = 8080;

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

//Handle tcp socket and socket io to client
handleTcpConnection(io);

httpServer.listen(HTTP_PORT, () => {
  console.log(txtColor.lemon(`Server is listening on port ${HTTP_PORT}`));
});

// Handle socket connections

// console.log("videohubdata", videohubData);

io.on("connection", (socket) => {
  // io.emit("videohubData", videohubData);
  // console.log(txtColor.green("socket:"), socket);
  console.log(txtColor.safe("client connected"));

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(txtColor.danger("A client disconnected"));
  });

  // Handle custom events from the client
  socket.on("sigleRouth", (data) => {
    console.log(txtColor.danger("Received data from client:"), data);
    console.log(data.command);
    // Do something with the received data
  });
});
