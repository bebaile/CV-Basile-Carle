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

  insertGuest(user) {
    return this.connection.query(
      `insert into ${this.table} (id_user, password, email, firstname, lastname, company, type) values (?,?,?,?,?,?,?)`,
      [
        user.id,
        user.password,
        user.email,
        user.firstname,
        user.lastname,
        user.company,
        user.type,
      ]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET firstname = ?, email = ?, company = ? WHERE email = ?`,
      [item.firstname, item.email, item.company, item.id]
    );
  }

  findByLogin(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  findIdByEmail(email) {
    return this.connection.query(
      `SELECT id_user FROM ${this.table} WHERE email = ?`,
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
