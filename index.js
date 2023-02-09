const express = require("express")
const { Server } = require("socket.io");
var http = require('http');
const cors = require("cors")

const app = express()
app.use(cors())

var server = http.createServer(app);
// http://localhost:3000
// https://chat-render-stfc.onrender.com
const io = new Server(server, {
  cors: {
    origin: "https://sanchat.netlify.app/",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {res.send("Chat BE with Socket.io by Santanu"); res.end()})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("joinRoom", room => {
		socket.join(room)
  })

  socket.on("newMessage", ({newMessage, room}) => {
    // console.log(room,newMessage)
    io.in(room).emit("getLatestMessage", newMessage)
  })

});

const port = process.env.PORT || 8000

server.listen(port, console.log(`App started at port ${port}`))