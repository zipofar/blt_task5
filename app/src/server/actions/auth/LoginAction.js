const _ = require('lodash');
const { checkPasswordService, makeAccessTokenService } = require('../../services/auth');

const LoginAction = (user, password) => {
  if (!_.has(user, 'password')) {
    return { error: 'Invalid user' };
  }
  if (checkPasswordService(user.password, password)) {
    const accessToken = makeAccessTokenService(user);
    return { ok: accessToken };
  }
  return { error: 'Invalid password' };
};

module.exports = LoginAction;
