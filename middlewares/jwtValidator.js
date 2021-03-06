const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
  const token = req.headers["x-token"];
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token is required",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msj: "Invalid token",
    });
  }
};

module.exports = {
  jwtValidator,
};
