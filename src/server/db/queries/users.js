const knex = require('../connection');

const getAllUsers = () => (
  knex('users').select('*')
);

module.exports = {
  getAllUsers,
};
