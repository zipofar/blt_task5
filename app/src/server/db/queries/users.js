const _ = require('lodash');
const knex = require('../connection');

const getAllUsers = () => (
  knex.select('username').from('users')
);

const getUserById = id => (
  knex('users').where('id', id).select('id', 'username', 'password')
);

const getUserByUsername = username => (
  knex('users').where('username', username).first()
);

const createUser = ({ username, password }) => (
  knex('users').insert({ username, password })
);

const issetUser = async ({ id, username }) => {
  if (!_.isUndefined(id)) {
    const user = await getUserById(id);
    return !_.isUndefined(user);
  }
  if (!_.isUndefined(username)) {
    const user = await getUserByUsername(username);
    return !_.isUndefined(user);
  }
  throw new Error('Variables is undefined');
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  issetUser,
};
