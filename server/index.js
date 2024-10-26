const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5647;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
    console.log("Made socket connection");

    socket.on("message-packet", (arg) => {
      socket.broadcast.emit("message-response", arg);
    });

    socket.on("report-packet-1", (arg) => {
      data = {
        "type": "Police", // Ping type
        "location": {
          "latitude": arg.latitude, // location part 1
          "longitude": arg.longitude // location part 2
        },
        "timestamp": new Date().toISOString(), // timestamp from the server
        "username": arg.username, // username input
      };

      data["type"]
      socket.broadcast.emit("report-packet-1", arg);
    });
});