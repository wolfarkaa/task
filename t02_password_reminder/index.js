const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const model = require('./model');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reminder.html'));
});

app.post('/remind', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await model.findUserByEmail(email);

    if (!user) {
      return res.send('<p>Email not found. <a href="/">Try again</a></p>');
    }

    // Настройки Mailtrap
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '5525820b8fc866', // замени на свои данные
        pass: 'ba453127875957'  // замени на свои данные
      }
    });

    const mailOptions = {
      from: '"S.W.O.R.D. System" <no-reply@sword.local>',
      to: user.email,
      subject: 'Password Reminder',
      text: `Hello, ${user.full_name}.\nYour password is: ${user.password}`
    };

    await transporter.sendMail(mailOptions);

    res.send('<p>Password reminder sent successfully! Check Mailtrap inbox.</p>');

  } catch (err) {
    console.error('Error sending email:', err);
    res.send(`<p>Error sending password reminder: ${err.message}</p>`);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
