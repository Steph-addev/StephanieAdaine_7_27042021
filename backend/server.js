const http = require("http");
const app = require("./app");

/* const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}; */
/* const port = normalizePort(process.env.PORT || "3001");
app.set("port", port); */
/* 
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
}; */
const webSocketServerPort = 3001;
const server = http.createServer(app);
const io = require("socket.io")(server);

/* server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
}); */

io.on("connection", (socket) => {
  console.log("Socket connected");
  console.log(socket.id);

  socket.on("join_app", (data) => {
    socket.join(data);
    console.log("User inside the App " + data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

console.log("Listening on port " + webSocketServerPort);
server.listen(webSocketServerPort);
