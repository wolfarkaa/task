const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { getUserByLogin } = require('./models/user');
const config = require('./config.json');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));

// Стартовая страница
app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

// Обработка логина
app.post('/login', (req, res) => {
    const { login, password } = req.body;
    getUserByLogin(login, (err, user) => {
        if (err || !user || user.password !== password) {
            return res.send(`<p>Login failed. <a href="/">Try again</a></p>`);
        }
        req.session.user = { login: user.login, status: user.status };
        res.redirect('/');
    });
});

// Выход
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/session', (req, res) => {
    res.json({ user: req.session.user || null });
});


app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});
