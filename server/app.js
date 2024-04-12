import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { Socket } from "dgram";

const port = 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket);
  console.log("id: ", socket.id);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
