const knex = require('../connection');

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
    const id = await knex('users').returning('id').insert({ username, password });
    return id[0];
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
