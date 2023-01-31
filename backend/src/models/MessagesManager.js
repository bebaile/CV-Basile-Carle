const AbstractManager = require("./AbstractManager");

class MessagesManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  // création d'un utilisateur
  insert(item) {
    return this.connection.query(
      `insert into ${this.table} (id_user, username, email, password, company) values (?,?,?,?,?)`,
      [uuid, item.username, item.email, item.password, item.company]
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
