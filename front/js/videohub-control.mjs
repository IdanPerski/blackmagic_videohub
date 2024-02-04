import serverSocket from "./socket-client.mjs";
// import createRoutingCommand from "./createRoutngCommand.mjs";
// createRoutingCommand();
const socket = io("ws://localhost:8080");
serverSocket(socket);
