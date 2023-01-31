const models = require("../models");
const { verifyPassword, createToken } = require("../helpers/auth");

const session = (req, res) => {
  const { email, password } = req.body;
  models.user
    .findByLogin(email)
    .then((rows) => {
      if (rows === 0) {
        res.status(401).send("login ou mot de passe incorrect");
      } else {
        verifyPassword(password, rows[0][0].password).then((isVerified) => {
          if (isVerified) {
            const { firstname, lastname, company, type } = rows[0][0];
            const token = createToken({
              firstname,
              lastname,
              email,
              company,
              type,
            });
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
                firstname,
                lastname,
                company,
                type,
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

const logout = (req, res) => {
  res.clearCookie(req.cookies.user_token).sendStatus(200);
};

module.exports = {
  session,
  logout,
};
