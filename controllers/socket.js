const User = require("../models/user");
const Message = require("../models/message");

const updateUserToConnect = async (uid) => {
  if (!uid) {
    return;
  }
  const userConnected = await User.updateOne(
    { _id: uid },
    {
      online: true,
    }
  );
  return userConnected;
};

const updateUserToDisconnect = async (uid) => {
  const userConnected = await User.updateOne(
    { _id: uid },
    {
      online: false,
    }
  );
  return userConnected;
};

const saveMessage = async ({ uidSender, uidReceiver, message }) => {
  try {
    const newMessage = new Message({ uidSender, uidReceiver, message });
    await newMessage.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  updateUserToConnect,
  updateUserToDisconnect,
  saveMessage,
};
