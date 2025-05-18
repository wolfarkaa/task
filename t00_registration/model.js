const User = require("./models/user");

async function createUser({ login, password, fullName, email }) {
  return await User.insert(login, password, fullName, email);
}

module.exports = { createUser };
