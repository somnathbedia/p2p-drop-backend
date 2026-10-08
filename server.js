const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://p2p-drop-frondend.vercel.app/",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    
    

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        
    });

    
    socket.on('signal', (data) => {
        socket.to(data.room).emit('signal', data.signalData);
    });

  
    socket.on('disconnect', () => {
       
    });
});


server.listen(PORT, () => {
    console.log(`Signaling Server running on port ${PORT}!`);
});