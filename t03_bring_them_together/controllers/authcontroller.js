const path = require('path');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // ✅ импортируем модель

exports.showRegister = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
};

exports.register = (req, res) => {
  const { login, password } = req.body;
  User.create(login, password, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error registering user.' });
    }
    
    // Сразу логиним пользователя
    User.authenticate(login, password, (err, user) => {
      if (err || !user) {
        return res.status(500).json({ message: 'Error logging in after registration.' });
      }
      req.session.user = user;
      res.json({ message: 'Registration successful!', redirect: '/main' });  // 👈 добавили redirect
    });
  });
};

exports.showLogin = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

exports.login = (req, res) => {
  const { login, password } = req.body;

  User.authenticate(login, password, (err, user) => {
    if (err || !user) {
      return res.send('Invalid credentials.');
    }
    req.session.user = user;
    res.redirect('/main');
  });
};

exports.showRemind = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'remind.html'));
};

exports.remind = (req, res) => {
  const { email } = req.body;
  // todo: implement nodemailer logic
  res.send('Password reminder sent.');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
