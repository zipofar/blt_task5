const jwt = require('jsonwebtoken');

const makeAccessTokenService = (user) => {
  const { id, role } = user;
  const payload = {
    userId: id,
    userRole: role,
  };
  const token = jwt.sign(payload, 'SECRET');
  return token;
};

module.exports = makeAccessTokenService;
