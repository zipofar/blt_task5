const { checkPasswordService, makeAccessTokenService } = require('../../services/auth');

const LoginAction = (user, password) => {
  const { password: hash } = user;
  return checkPasswordService(hash, password) ? makeAccessTokenService(user) : false;
};

module.exports = LoginAction;
