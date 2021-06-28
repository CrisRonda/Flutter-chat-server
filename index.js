const express = require("express");
const path = require("path");
const { dbChatConnection } = require("./database/config");
require("dotenv").config();

dbChatConnection();
const app = express();
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./socket");

const PORT = process.env.PORT || 4000;
const PUBLIC_PATH = path.resolve(__dirname, "public");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(PUBLIC_PATH));

// routes
app.use("/api/login", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));

server.listen(PORT, (err) => {
  if (err) {
    throw new Error("Ocurrio un error");
  }
  console.log(`Server Listen in ${PORT} `);
});
