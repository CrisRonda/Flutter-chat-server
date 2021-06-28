const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../tokens/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({ ok: false, msj: "Email alredy register" });
    }
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    const encryptPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: encryptPassword });

    //Web token
    await newUser.save();
    const token = await generateJWT({ uid: newUser.id });
    return res.json({
      ok: true,
      msj: "Usuario creado exitosamente",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "Error del servidor 😭",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      return res.status(404).json({ ok: false, msj: "Email no valido" });
    }
    const validPassword = bcrypt.compareSync(password, userInDB.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msj: "Contraseña no valida" });
    }
    const token = await generateJWT({ uid: userInDB.id });
    return res.json({
      ok: true,
      msj: `Bienvenido ${userInDB.name}`,
      data: {
        user: userInDB,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "Error en el servidor 😭",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req;
  const token = await generateJWT({ uid });
  const userInDB = await User.findById(uid);

  return res.json({
    ok: true,
    msj: "Usuario autenticado correctamente",
    data: {
      user: userInDB,
      token,
    },
  });
};
module.exports = {
  createUser,
  loginUser,
  renewToken,
};
