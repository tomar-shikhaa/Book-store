const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.KEY;

const createToken = (Email, Role) => {
  return jwt.sign({ Email, Role }, key, { expiresIn: "1h" });
};

module.exports = {createToken};
