const models = require("../models");
const { hashPassword, returnUuid } = require("../helpers/auth");
require("dotenv").config();
const { sendAMail } = require("../helpers/mailer");

const browse = (req, res) => {
  models.messages
    .findAllWithAppointments()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { email } = req;
  models.messages
    .findById(req.id, email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
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
                const subject = `[My-CV Basile CARLE] Nouvelle demande d'entretien de ${firstname} ${lastname}`;
                const mailContent = `<div>Le ${new Date()}, <b>${firstname} ${lastname}</b> de l'entreprise <b>${company}</b> vous a envoyé un message et une demande de rendez-vous dont voici le contenu : <br><br>${message}<br><br>Cette personne a fait une demande de rendez-vous associée. Son email est : ${email}</div>`;
                sendAMail(process.env.ADMIN_EMAIL, subject, mailContent);
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
          const subject = `[My-CV Basile CARLE] Nouvelle demande d'entretien de ${firstname} ${lastname}`;
          const mailContent = `<div>Le ${new Date()}, <b>${firstname} ${lastname}</b> de l'entreprise <b>${company}</b> vous a envoyé un message et une demande de rendez-vous dont voici le contenu : <br><br>${message}<br><br>Cette personne a fait une demande de rendez-vous associée. Son email est : ${email}</div>`;
          sendAMail(process.env.ADMIN_EMAIL, subject, mailContent);
          res.location(`/messages/${reponse.insertId}`).sendStatus(201);
        });
    }
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
