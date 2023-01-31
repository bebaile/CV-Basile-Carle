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
      `insert into ${this.table} (id_user, email, firstname, lastname, company, password) values (?,?,?,?,?,?)`,
      [
        uuid,
        item.email,
        item.firstname,
        item.lastname,
        item.company,
        item.password,
      ]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET username = ?, email = ?, company = ? WHERE email = ?`,
      [item.username, item.email, item.company, item.id]
    );
  }

  findByLogin(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  deleteByEmail(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE email = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
