const AbstractManager = require("./AbstractManager");

class MessagesManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  // création d'un message
  insert(item) {
    return this.connection.query(
      `insert into ${this.table} (message, user_id_user, meeting_request_idmeeting_request, recipient_email) values (?,?,?,?)`,
      [item.message, item.idUser, item.idApointment, item.recipient]
    );
  }

  findById(id, email) {
    return this.connection.query(
      `SELECT m.*, r.* FROM ${this.table} AS m INNER JOIN meetingrequest AS r ON m.meeting_request_idmeeting_request = r.idmeeting_request WHERE user_id_user = ? OR recipient_email = ? ORDER BY m.create_time ASC`,
      [id, email]
    );
  }

  findAllWithAppointments() {
    return this.connection.query(
      `SELECT m.*, r.* FROM ${this.table} AS m INNER JOIN meetingrequest AS r ON m.meeting_request_idmeeting_request = r.idmeeting_request`
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET username = ?, email = ?, company = ? WHERE email = ?`,
      [item.username, item.email, item.company, item.id]
    );
  }

  findByLogin(login) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [login]
    );
  }

  deleteByEmail(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE email = ?`, [
      id,
    ]);
  }
}

module.exports = MessagesManager;
