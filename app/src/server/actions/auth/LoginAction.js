const _ = require('lodash');
const { checkPasswordService, makeAccessTokenService } = require('../../services/auth');

const isValidUser = user => (_.has(user, 'password'));
const isValidRequest = request => (_.has(request, 'password'));

const LoginAction = (user, request) => {
  if (!isValidUser(user) || !isValidRequest(request)) {
    return { error: 'Invalid user or request' };
  }
  if (checkPasswordService(user.password, request.password)) {
    const accessToken = makeAccessTokenService(user);
    return { ok: accessToken };
  }
  return { error: 'Invalid password' };
};

module.exports = LoginAction;
