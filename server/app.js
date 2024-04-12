import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 8080;
const app = express();
const server = createServer(app);
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // "*" all allow
    methods: ["GET", "POST"],
    credentials: true, // header jo cookie bhejte hai uske liye
  },
});
// like middleware for api
app.use(
  cors({
    origin: "http://localhost:5713", // "*" all allow
    methods: ["GET", "POST"],
    credentials: true, // header jo cookie bhejte hai uske liye
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  //   console.log(socket);
  console.log("User Connected: ");
  console.log("id: ", socket.id);

  socket.emit("welcome", `Welcome to Our Server ${socket.id}`); // usse socket ko msg
  //   console.log("lll");

  // wrong
  //   socket.broadcast.emit("hello ", `Hello to Server ${socket.id}`);
  socket.broadcast.emit("hello", `Hello to Server ${socket.id}`);
  //   console.log("lll");

  socket.on("disconnect", () => {
    console.log("USER Disconnected ", socket.id);
  });
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
