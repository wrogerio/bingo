const express = require("express");
const path = require("path");
const router = require("./routes/routes");
const socket = require("socket.io");
const http = require("http");

// start express server
const app = express();
const server = http.createServer(app);
const io = socket(server, {
  origins: "https://bingodafamilia.herokuapp.com",
  cors: true,
});
app.set("io", io);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/json" }));

// static routes
app.use("/css", express.static(path.join(__dirname, "../src/static/css")));
app.use("/js", express.static(path.join(__dirname, "../src/static/js")));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

// routes
app.use(router);
const sorteados = [];

// socket connection
io.on("connection", (socket) => {
  console.log("Socket Connected. Socket ID: ", socket.id);

  socket.on("sorteado", (data) => {
    sorteados.push(data.numero);
    console.log(sorteados);
    socket.broadcast.emit("sorteados", sorteados[sorteados.length - 1]);
  });

  socket.on("resetar", () => {
    sorteados.length = 0;
    console.log(sorteados);
    socket.broadcast.emit("resetados", sorteados);
  });
});

const port = process.env.PORT || 3000;

// start server
server.listen(port || 3000, () => {
  console.log(`Server is running on port ${port}. Visit http://localhost:${port}`);
});
