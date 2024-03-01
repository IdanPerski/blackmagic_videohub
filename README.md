# VideoHub Control Application

This is a beginner-friendly Node.js application built with Express and Socket.IO to control Blackmagic VideoHub via a web browser interface. Please note that this is my first self-initiated project, and it's still a work in progress.

## Features

- Allows users to control Blackmagic VideoHub through a web browser interface.
- Real-time updates through Socket.IO.

## Application Structure

- `server.js`: This file serves as the entry point of the application. It sets up the Express server and Socket.IO.

- `middlewares/cors.js`: This file contains the CORS middleware for Express, enabling cross-origin resource sharing.

- `helpers/chalk/color.js`: This file provides a helper function for coloring console logs using the Chalk library.

- `videohub/videohubService.js`: This file is responsible for handling the TCP connection with the Blackmagic VideoHub and managing Socket.IO events.

- `front/`: This directory contains the frontend code of the application.

## Configuration

- `TCP_HOST`: Specifies the IP address of the Blackmagic VideoHub.

- `TCP_PORT`: Specifies the port used for the TCP connection to the Blackmagic VideoHub.

- `HTTP_PORT`: Specifies the port used for the Express server.
