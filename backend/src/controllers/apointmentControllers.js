const models = require("../models");

const browse = (req, res) => {
  models.meetingrequest
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
  const tmpDate = new Date(req.params.id);
  // on transforme la date que nous recevons pour correspondre au format de la table meetingrequest
  // exemple Wed Feb 08 2023 01:00:00 GMT+0100 (heure normale d’Europe centrale)
  // on veut fournir un format 2023-02-13 09:00:00
  const formattedDate = `${tmpDate.getFullYear()}-${
    tmpDate.getMonth() + 1
  }-${tmpDate.getDate()}`;

  models.meetingrequest
    .findByDate(formattedDate)
    .then(([rows]) => {
      console.error(rows[0]);
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = req.params.id;

  models.meetingRequest
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
  const { date } = req.body;
  const tmpDate = new Date(date);
  // fonctionnalité encore non implémentée
  const location = "non implémenté";
  const duration = "30";

  models.meetingrequest
    .insert({ date: tmpDate, location, duration })
    .then(([result]) => {
      res
        .location(`/apointment/${result.insertId}`)
        .status(201)
        .send(result.insertId.toString());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.meetingRequest
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
  edit,
  add,
  destroy,
};
