const AbstractManager = require("./AbstractManager");

class MeetingrequestManager extends AbstractManager {
  constructor() {
    super({ table: "meetingrequest" });
  }

  // création d'une demande de rendez-vous
  insert(apointment) {
    return this.connection.query(
      `insert into ${this.table} (day, location, duration) values (?,?,?)`,
      [apointment.date, apointment.location, apointment.duration]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET firstname = ?, email = ?, company = ? WHERE email = ?`,
      [item.firstname, item.email, item.company, item.id]
    );
  }

  findByDate(date) {
    return this.connection.query(
      `SELECT idmeeting_request, day FROM ${this.table} WHERE DATE_FORMAT(day, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')`,
      [date]
    );
  }
}

module.exports = MeetingrequestManager;
