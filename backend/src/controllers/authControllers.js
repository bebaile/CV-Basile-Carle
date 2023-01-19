const models = require("../models");
const { verifyPassword, createToken } = require("../helpers/auth");

const session = (req, res) => {
  const { login, password } = req.body;
  models.user
    .findByLogin(login)
    .then((rows) => {
      if (rows === 0) {
        res.status(401).send("login ou mot de passe incorrect");
      } else {
        verifyPassword(password, rows[0][0].password).then((isVerified) => {
          if (isVerified) {
            const { username, email, company } = rows[0][0];
            const token = createToken({ username, email, company });
            res
              .status(201)
              .cookie("user_token", token, {
                httpOnly: true,
                expires: new Date(Date.now + 60 * 60 * 24 * 10),
              })
              .json({
                message: "utilisateur authentifié",
                cookie: token,
                email,
                company,
              });
          } else {
            res.status(401).send("Login ou mot de passe incorrect(s)");
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const disconnect = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  session,
  disconnect,
};
