import { Server } from "socket.io"
import http from "http"

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  
    socket.on("hello", (msg) => {
      io.emit("response", "response");
      console.log("message: " + msg + "your msg went thru");
    });
  });
const PORT = 3001;
server.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
