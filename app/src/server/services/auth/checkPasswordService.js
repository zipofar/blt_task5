const bcrypt = require('bcryptjs');

const checkPasswordService = (realHash, verifiablePass) => (
  bcrypt.compareSync(verifiablePass, realHash)
);

module.exports = checkPasswordService;
