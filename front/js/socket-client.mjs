import addDataToClient from "./addDataToClient.mjs";
import parseVideohubData from "./parseVideohubData.mjs";
import { sendRoutingCommand } from "./videohubCommand.mjs";
import createRoutingCommand from "./createRoutngCommand.mjs";

let selectedSrcAndDst = createRoutingCommand();

const decoder = new TextDecoder("utf-8");
let videohubData;
console.log("!!!");
const syncBtn = document.querySelector("#connectButton");
let hostIpAddress = document.querySelector("#hostIpAddress");
let port = document.querySelector("#port");
const serverSocket = (socket) => {
  // socket.on("redirect", (url) => {
  //   window.location.href = url;
  // });
  socket.on("videoHubData", (data) => {
    const decodedText = decoder.decode(data);
    console.log(decodedText);
    if (decodedText.slice(0, 21) === "VIDEO OUTPUT ROUTING:") {
      console.log("routingData");
      return;
    }

    videohubData = parseVideohubData(decodedText);
    console.log("videohubdata:", videohubData);
    if (videohubData) {
      syncBtn.classList.add("d-none");
    } else {
      syncBtn.classList.remove("d-none");
    }
    addDataToClient(videohubData);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  const takeButton = document.querySelector("#takeButton");
  takeButton.addEventListener("click", () => {
    console.log(selectedSrcAndDst);
    const source = selectedSrcAndDst.src.slice(3);
    const destenation = selectedSrcAndDst.dst;
    console.log(source, destenation[0].slice(3));
    socket.emit("sigleRouth", {
      user: 123,
      command: sendRoutingCommand(
        String(Number(destenation[0].slice(3)) - 1),
        String(Number(source) - 1),
      ),
      time: Date(),
    });
  });
  socket.on("videoHubRoute", (route) => {
    const videoHubRoute = parseVideohubData(decoder.decode(route));
    console.log(videoHubRoute);
  });

  syncBtn.addEventListener("click", (e) => {
    console.log("sync clicked!@!@!");
    hostIpAddress = hostIpAddress.value;
    port = port.value;

    const host = { hostIpAddress, port };
    console.log(host);
    socket.emit("sync", host);
  });

  socket.on("VideohubTimeout", (error) => {
    console.log("videohub timeout connection :", error);
    const mainContainer = document.querySelector("#mainContainer");
    mainContainer.innerHTML += `<div>can't reach ${error.address}:${error.port} , check your connection<div> `;

    socket.emit("end");
    socket.disconnect();
    console.log("connection ended");
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
