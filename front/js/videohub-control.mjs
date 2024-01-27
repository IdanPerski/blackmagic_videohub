import createRoutingCommand from "./createRoutingCommand.mjs";
import serverSocket from "./socket-client.mjs";

createRoutingCommand();
const socket = io("ws://localhost:8080");
serverSocket(socket);
