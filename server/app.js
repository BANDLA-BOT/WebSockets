const express = require('express');
const http = require('http');
const cors = require('cors')
const {Server} = require('socket.io')

const app = express();
app.use(cors())

server = http.createServer(app)
const io = new Server(server,{
    cors:{
        methods:['GET', 'POST'],
        origin:'http://localhost:5173'
    }
})
io.on("connection",(socket)=>{
    console.log(` User connected: ${socket.id}`)

    socket.on('join_room', (data)=>{
        socket.join(data)
        console.log(`User with id : ${socket.id} Joined room : ${data}`)
    })

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_messsage", data)
        console.log(data)
    })
    socket.on('disconnected', ()=>{
        console.log('User disconnected', socket.id)
    })
})

server.listen(8000,()=>{
    console.log("Server is running on 8000")
})
