import createRoutingCommand from "./createRoutingCommand.mjs";
import clientSocket from "./socket-client.mjs";
// import createRoutingCommand from "./createRoutngCommand.mjs";
// createRoutingCommand();
const socket = io("ws://localhost:8080");

clientSocket(socket);
