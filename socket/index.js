const { io } = require("../index");
const { validateJWT } = require("../tokens/jwt");
const {
  updateUserToConnect,
  updateUserToDisconnect,
  saveMessage,
} = require("../controllers/socket");

io.on("connection", (client) => {
  const token = client?.handshake?.headers["x-token"] || null;
  const [isValid, uid] = validateJWT(token);
  if (!isValid) {
    return client.disconnect();
  }

  updateUserToConnect(uid);
  console.log("Cliente conectado");
  // user connect to chat room global and private room

  client.join(uid);

  client.on("private-room", async (payload) => {
    console.log(payload);
    const { uidReceiver } = payload;
    const isSavedMessage = await saveMessage(payload);
    if (isSavedMessage) {
      console.log("Me guarde!");
      client.to(uidReceiver).emit("private-room", payload);
    }
  });
  client.on("disconnect", () => {
    updateUserToDisconnect(uid);
  });
});
