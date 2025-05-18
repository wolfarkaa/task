const db = require('./db');

function authenticateUser(login, password) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT login, status FROM users WHERE login = ? AND password = ?',
      [login, password],
      (err, row) => {
        if (err) return reject(err);
        resolve(row); // row will be undefined if login fails
      }
    );
  });
}

module.exports = { authenticateUser };
