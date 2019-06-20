const knex = require('../connection');

const fields = ['id', 'username', 'role'];

const getAll = (opts) => {
  const { limit = 10, offset = 0 } = opts;
  return knex.select().from('users').limit(limit).offset(offset);
};

const getByColumn = async (column, value) => {
  const res = await knex('users').where(column, value).select().first();
  return typeof res === 'undefined' ? false : res;
};

const create = async ({ username, password }) => {
  try {
    const user = await knex('users').returning(fields).insert({ username, password });
    return user[0];
  } catch (err) {
    if (err.message.includes('unique')) {
      return false;
    }
    throw err;
  }
};

module.exports = {
  getAll,
  getByColumn,
  create,
};
