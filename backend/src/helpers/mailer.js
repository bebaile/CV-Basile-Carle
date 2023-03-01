const nodemailer = require("nodemailer");

const sendAMail = (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const options = {
    from: process.env.MAILER_FROM,
    to,
    subject,
    html: message,
  };

  transporter
    .sendMail(options)
    .then((result) => {
      console.error(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendAMail };
