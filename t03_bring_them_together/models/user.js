const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sword.db'); // или путь из предыдущих задач

// ✅ Автоматически создать таблицу при запуске
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    email TEXT,
    status TEXT DEFAULT 'user'
  )`);
});

const User = {
  create: (login, password, callback) => {
    const stmt = `INSERT INTO users (login, password) VALUES (?, ?)`;
    db.run(stmt, [login, password], callback);
  },

  authenticate: (login, password, callback) => {
    const stmt = `SELECT * FROM users WHERE login = ? AND password = ?`;
    db.get(stmt, [login, password], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  }
};

module.exports = User;
