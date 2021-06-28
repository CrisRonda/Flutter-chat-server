const jwt = require("jsonwebtoken");

const generateJWT = ({ uid, ...rest }) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, ...rest };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          return reject("Error generate JWT");
        }
        return resolve(token);
      }
    );
  });
};

const validateJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
module.exports = {
  generateJWT,
  validateJWT,
};
