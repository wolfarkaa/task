// index.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`
      <p>Status: ${req.session.user.status}</p>
      <form method="post" action="/logout">
        <button type="submit">Logout</button>
      </form>
    `);
  } else {
    res.sendFile(path.join(__dirname, 'public/login.html'));
  }
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await db.authenticateUser(login, password);
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.send('<p>Login failed. <a href="/">Try again</a></p>');
    }
  } catch (err) {
    res.send(`<p>Error: ${err.message}</p>`);
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
