const { response } = require("express");
const Message = require("../models/message");

const getMessagesByUidReceiver = async (req, res = response) => {
  try {
    const { uid } = req;
    const { uidReceiver } = req.params;
    const lastMessages = await Message.find({
      $or: [
        {
          uidSender: uid,
          uidReceiver,
        },
        {
          uidSender: uidReceiver,
          uidReceiver: uid,
        },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);
    res.json({
      ok: true,
      msj: "Mensajes obtenidos exitosamente",
      uid,
      uidReceiver,
      messages: lastMessages,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msj: "Lo sentimos algo ocurrio",
      uid,
      uidReceiver,
      messages: [],
    });
  }
};

module.exports = {
  getMessagesByUidReceiver,
};
