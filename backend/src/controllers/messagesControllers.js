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
  // Dans ce req.body, on a message, un objet constitué de
  // {
  //  name, firstname, company => table user
  //  message => table message
  //    INSERT INTO THIS TABLE (message)
  //  date, timeslot => datetime => + duration + location (default values pour le moment) => messages
  //

  const { name, firstname, company, message, date, timeslot } = req.body;
  models.messages
    .insert(messages)
    .then(([result]) => {
      res.location(`/messagess/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
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
