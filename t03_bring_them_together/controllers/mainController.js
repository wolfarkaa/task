const path = require('path');

exports.showMain = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'main.html'));
};
