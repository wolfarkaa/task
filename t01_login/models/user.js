// models/user.js
const db = require('../db');

// Получить пользователя по логину
function getUserByLogin(login, callback) {
    db.get('SELECT * FROM users WHERE login = ?', [login], callback);
}

// Добавить нового пользователя
function createUser(user, callback) {
    const { login, password, full_name, email, status = 'user' } = user;

    db.run(
        'INSERT INTO users (login, password, full_name, email, status) VALUES (?, ?, ?, ?, ?)',
        [login, password, full_name, email, status],
        callback
    );
}


module.exports = {
    getUserByLogin,
    createUser
};
