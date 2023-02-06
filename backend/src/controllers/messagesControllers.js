const models = require("../models");
const { hashPassword, returnUuid } = require("../helpers/auth");
require("dotenv").config();

const browse = (req, res) => {
  models.messages
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.body;
  models.messages
    .findById(id)
    .then(([rows]) => {
      console.error(rows);
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.messages
    .update(item)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { firstname, lastname, email, company, message, idApointment } =
    req.body;

  let { recipient } = req.body;
  if (recipient === "") {
    recipient = process.env.ADMIN_EMAIL;
  }

  models.user.findIdByEmail(email).then((result) => {
    if (result[0][0] == null) {
      // si aucun id n'est retourné, c'est que l'utilisateur n'existe pas,
      // on va donc créer un utilisateur mais qui ne pourra
      // pas se loguer

      hashPassword(firstname + email).then((defaultPassword) => {
        const idUser = returnUuid();
        const user = {
          id: idUser,
          password: defaultPassword,
          firstname,
          lastname,
          email,
          company,
          type: "guest",
        };
        models.user.insertGuest(user).then((reponse) => {
          if (reponse[0].affectedRows === 1) {
            models.messages
              .insert({ message, idUser, idApointment })
              .then(([createdUser]) => {
                res
                  .location(`/messages/${createdUser.insertId}`)
                  .sendStatus(201);
              });
          } else {
            res.sendStatus(404);
          }
        });
      });
    } else {
      const idUser = result[0][0].id_user;
      models.messages
        .insert({ message, idUser, idApointment, recipient })
        .then(([reponse]) => {
          res.location(`/messages/${reponse.insertId}`).sendStatus(201);
        });
    }
  });

  // models.messages
  //   .insert(req.body)
  //   .then(([result]) => {
  //     res.location(`/messagess/${result.insertId}`).sendStatus(201);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.sendStatus(500);
  //   });
};

// TODO validations (length, format...)
const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.messages
    .deletemessages(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
