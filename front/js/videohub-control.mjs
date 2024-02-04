import createRoutingCommand from "./createRoutingCommand.mjs";
import serverSocket from "./socket-client.mjs";
<<<<<<< HEAD
// import createRoutingCommand from "./createRoutngCommand.mjs";
// createRoutingCommand();
=======

createRoutingCommand();
>>>>>>> 7e216749be10b41e908d0a7eb4e66cc8be2eafdf
const socket = io("ws://localhost:8080");
serverSocket(socket);
