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

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PRIVATEKEY, (error, payload) => {
      if (error) {
        const message =
          error.name === "JsonWebTokenError" ? "Unauthorized" : error.message;
        reject(message);
      }
      resolve(payload);
    });
  });
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.user_token;
  if (!token) {
    // si le cookie n'existe pas, on interdit l'accès aux routes suivantes
    res.status(401).end();
  }
  verifyAccessToken(token)
    .then((result) => {
      if (result.type === "admin") {
        req.type = "admin";
        next();
      } else {
        res.status(401).end();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// utilisé avant la création d'un utilisateur
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
  verifyAccessToken,
  checkAdmin,
  userExist,
};
