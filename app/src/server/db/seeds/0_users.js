const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => (
  knex('users')
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('pass1', salt);
      return Promise.join(
        knex('users').insert({
          username: 'user1',
          password: hash,
        }),
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('admin', salt);
      return Promise.join(
        knex('users').insert({
          username: 'admin',
          password: hash,
          role: 'admin',
        }),
      );
    })
);
