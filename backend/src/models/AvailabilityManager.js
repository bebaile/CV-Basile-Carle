const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "availability" });
  }

  // création d'un utilisateur
  insert(item) {
    return this.connection.query(
      `insert into ${this.table} (day, start, end) values (?,?,?)`,
      [item.day, item.start, item.end]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }

  findByLogin(login) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [login]
    );
  }

  deleteAvailability(id) {
    return this.connection.query(
      `delete from ${this.table} where idavailability = ?`,
      [id]
    );
  }
}

module.exports = UserManager;
