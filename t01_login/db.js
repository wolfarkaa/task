const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../t00_registration/sword.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error('Failed to connect to database:', err);
});

module.exports = db;

// Ensure 'status' column exists in users table
db.get("PRAGMA table_info(users);", (err, row) => {
  if (err) return console.error('Error checking table info:', err);

  db.all("PRAGMA table_info(users);", (err, columns) => {
    if (err) return console.error('Failed to read table structure:', err);

    const hasStatus = columns.some(col => col.name === 'status');
    if (!hasStatus) {
      db.run("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'user'", (err) => {
        if (err) console.error('Failed to add status column:', err);
        else console.log('Status column added to users table.');
      });
    }
  });
});
