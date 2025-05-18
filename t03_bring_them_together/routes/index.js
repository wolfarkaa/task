const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const mainController = require('../controllers/mainController');

// Middleware for checking if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Redirect root
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/main');
  } else {
    res.redirect('/register');
  }
});

// Registration (via controller)
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Login
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Password Reminder
router.get('/remind', authController.showRemind);
router.post('/remind', authController.remind);

// Main Page (protected)
router.get('/main', isAuthenticated, mainController.showMain);

// Logout
router.get('/logout', authController.logout);

// 👇 MUST be at the end!
module.exports = router;
