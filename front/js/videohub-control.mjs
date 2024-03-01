import clientSocket from "./socket-client.mjs";
const socket = io("ws://localhost:8080");

clientSocket(socket);
