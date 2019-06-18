const bcrypt = require('bcryptjs');

const admin = () => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('admin', salt);
  return {
    username: 'admin',
    password: hash,
    role: 'admin',
  };
};

const build = (count) => {
  const users = Array(count - 1).fill(0).map((_, i) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(`pass${i}`, salt);
    return {
      username: `user${i}`,
      password: hash,
      role: 'user',
    };
  });
  return users.concat([admin()]);
};

module.exports = build;
