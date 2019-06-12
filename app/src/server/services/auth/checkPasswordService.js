const bcrypt = require('bcryptjs');

const checkPasswordService = (hash, password) => (
  bcrypt.compareSync(password, hash)
);

module.exports = checkPasswordService;
