import addDataToClient from "./addDataToClient.mjs";
import parseVideohubData from "./parseVideohubData.mjs";
import { sendRoutingCommand } from "./videohubCommand.mjs";
const decoder = new TextDecoder("utf-8");

const serverSocket = (socket) => {
  socket.on("videoHubData", (data) => {
    const decodedText = decoder.decode(data);
    console.log(decodedText);
    if (decodedText.slice(0, 21) === "VIDEO OUTPUT ROUTING:") {
      console.log("routingData");
      return;
    }

    const videohubData = parseVideohubData(decodedText);
    console.log("videohubdata:", videohubData);
    addDataToClient(videohubData);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  const takeButton = document.querySelector("#takeButton");
  takeButton.addEventListener("click", () => {
    socket.emit("sigleRouth", {
      user: 123,
      command: sendRoutingCommand("2", "8"),
      time: Date(),
    });
  });
  socket.on("videoHubRoute", (route) => {
    const videoHubRoute = parseVideohubData(decoder.decode(route));
    console.log(videoHubRoute);
  });

  // Emit a custom event from the client to the server

  // socket.on("videohubData", (data) => {
  //   console.log("Received video hub data:", data);
  // });

  function emit(socket, event, arg) {
    socket.timeout(2000).emit(event, arg, (err) => {
      if (err) {
        // no ack from the server, let's retry
        emit(socket, event, arg);
      }
    });
  }

  emit(socket, "foo", "bar");
};

export default serverSocket;
