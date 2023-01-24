const AbstractManager = require("./AbstractManager");
const { returnUuid } = require("../helpers/auth");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // création d'un utilisateur
  insert(item) {
    const uuid = returnUuid();
    return this.connection.query(
      `insert into ${this.table} (id_user, username, email, password, company) values (?,?,?,?,?)`,
      [uuid, item.username, item.email, item.password, item.company]
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

  deleteByEmail(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE email = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
