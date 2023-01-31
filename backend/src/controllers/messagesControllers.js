const models = require("../models");

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
  models.messages
    .find(req.params.id)
    .then(([rows]) => {
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
  const { firstname, lastname, email, company, message } = req.body;

  models.user.findIdByEmail(email).then((result) => {
    if (result[0][0] == null) {
      // si aucun id n'est retourné, c'est que l'utilisateur n'existe pas,
      // on va donc créer un utilisateur sans mot de passe mais qui ne pourra
      // pas se loguer
      const user = {
        firstname,
        lastname,
        email,
        company,
        type: "guest",
      };
      models.user.insertGuest(user).then((reponse) => {
        console.error(reponse);
      });
    } else {
      const idUser = result[0][0].id_user;
      models.messages.insert({ message, idUser }).then(([reponse]) => {
        console.error(reponse);
        res.location(`/messages/${result.insertId}`).sendStatus(201);
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
