const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const models = require("../models");

require("dotenv").config();

const returnUuid = () => {
  return uuidv4();
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword);
};

const createToken = (data) => {
  return jwt.sign(data, process.env.PRIVATEKEY, { expiresIn: "15m" });
};

const userExist = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findByLogin(email)
    .then(([rows]) => {
      if (rows[0] == null) {
        console.error("l'identifiant n'existe pas, c'est bon");
        next();
      } else {
        res.sendStatus(409).end();
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(409);
    });
};

module.exports = {
  returnUuid,
  hashPassword,
  verifyPassword,
  createToken,
  userExist,
};
