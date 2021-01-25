const jwt = require("jsonwebtoken");
const auth = require("./config/auth.json");

const generateToken = (payload) => {
  return jwt.sign(payload, auth.secret, {
    expiresIn: "2h",
  });
};

module.exports = { generateToken };
