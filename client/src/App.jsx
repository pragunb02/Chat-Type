import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const App = () => {
  // const socket = io("http://localhost:8080"); // on server because both url are differents  ** CORS KO ALLOW KRO
  const socket = useMemo(
    () =>
      io("http://localhost:8080", {
        withCredentials: true,
      }),
    []
  );

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("bc!!", message, room);
    socket.emit("message", { message, room });
    setMessage("");
  };

  console.log(messages);

  // const joinRoomHandler = (e) => {
  //   e.preventDefault();
  //   socket.emit("join-room", roomName);
  //   setRoomName("");
  // };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("hello", (msg) => {
      console.log(msg);
    });

    socket.on("recieved-message", (data) => {
      console.log("Received Message: ", data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("recieved-message2", (data) => {
      console.log("Received Message from user : ", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxwidth="sm">
      {/* <Typography variant="h1" component="div" gutterBottom>
        Welcome To Socket.IO
      </Typography> */}

      <Box sx={{ height: 500 }} />

      <Typography variant="h6" component="div" gutterBottom>
        {socket.id}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
  // return <div>App</div>;
};

export default App;
