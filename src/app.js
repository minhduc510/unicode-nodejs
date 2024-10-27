const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config()

const { app_port, client_url } = require('./config/environment')
require('./config/db');
const ChatSocketService = require('./services/ChatSocket.service');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: client_url,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

new ChatSocketService(io).run();

app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});