const jwt = require("jsonwebtoken");

const generateJWT = ({ uuid, ...rest }) => {
  return new Promise((resolve, reject) => {
    const payload = { uuid, ...rest };
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

module.exports = {
  generateJWT,
};
