const knex = require('../connection');

const getAllUsers = () => (
  knex.select('username').from('users')
);

const getUserById = id => (
  knex('users').where('id', id).select('id', 'username', 'password')
);

const getUserByUsername = username => (
  knex('users').where('username', username).select('id', 'username', 'password').limit(1)
);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
};
