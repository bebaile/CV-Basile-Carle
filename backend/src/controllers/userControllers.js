const models = require("../models");
const { returnUuid, hashPassword } = require("../helpers/auth");

const browse = (req, res) => {
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

// utilisé pour vérifier l'existence d'un utilisateur
const checkUserExist = (req, res) => {
  models.user
    .findByLogin(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res
          .status(404)
          .send({ status: 404, message: "l'utilisateur n'existe pas" });
      } else {
        console.error("l'utilisateur existe");
        res.sendStatus(409);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  console.error(req.params.id);
  models.user
    .findByLogin(req.params.id)
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

  item.id = req.params.id;

  models.user
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
  hashPassword(req.body.password).then((hashedPassword) => {
    req.body.password = hashedPassword;
    const user = req.body;
    const uuid = returnUuid();
    models.user
      .insert(uuid, user)
      .then(([result]) => {
        res.location(`/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

const destroy = (req, res) => {
  models.user
    .deleteByEmail(req.params.id)
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
  checkUserExist,
  edit,
  add,
  destroy,
};
