const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const from = Number(req.query.from) || 0;
  const limit = Number(req.query.limit) || 10;
  const users = await User.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(from)
    .limit(limit);
  res.json({
    ok: true,
    msj: "Usuarios del chat",
    data: {
      users,
    },
  });
};

module.exports = {
  getUsers,
};
