const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const makeAccessTokenService = (user) => {
  const { id, role } = user;
  const payload = {
    userId: id,
    userRole: role,
  };
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

module.exports = makeAccessTokenService;
