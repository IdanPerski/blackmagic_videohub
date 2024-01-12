const socket = io();
console.log(socket);
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("videohubData", (data) => {
  console.log("Received video hub data:", data);
});

function emit(socket, event, arg) {
  socket.timeout(2000).emit(event, arg, (err) => {
    if (err) {
      // no ack from the server, let's retry
      emit(socket, event, arg);
    }
  });
}

emit(socket, "foo", "bar");

// Emit a custom event from the client to the server
// socket.emit("clientEvent", { id: 123, message: "Hello from the client!" });
