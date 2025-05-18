const db = require("../db");

module.exports = {
  insert: (login, password, fullName, email) =>
    new Promise((resolve, reject) => {
      const stmt = "INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)";
      db.run(stmt, [login, password, fullName, email], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    }),
};
