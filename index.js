const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);

const entries = [];

io.on("connection", (socket) => {
  socket.on("entry", (message) => {
    entries.push({ ...message, id: entries.length });
    io.emit("entry-update", entries);
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {});
});
