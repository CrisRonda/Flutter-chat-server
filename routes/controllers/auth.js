const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { generateJWT } = require("../../tokens/jwt");

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
    const token = await generateJWT({ uuid: newUser.id });
    return res.json({
      ok: true,
      msj: "User created!",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "Error server",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      return res.status(404).json({ ok: false, msj: "Email not register" });
    }
    const validPassword = bcrypt.compareSync(password, userInDB.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msj: "Password invalid" });
    }
    const token = await generateJWT({ uuid: userInDB.id });
    return res.json({
      ok: true,
      msj: "Success login!",
      data: {
        user: userInDB,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "Error server",
    });
  }
};
module.exports = {
  createUser,
  loginUser,
};
