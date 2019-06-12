const knex = require('../connection');

const fields = ['id', 'title', 'greeting', 'content', 'user_id'];

const getAll = () => (
  knex.select().from('pages')
);

const getById = async (id) => {
  const page = await knex('pages').where('id', id).select().first();
  return typeof page === 'undefined' ? false : page;
};

const create = async (data) => {
  const page = await knex('pages').returning(fields).insert(data);
  return page[0];
};

module.exports = {
  getAll,
  getById,
  create,
};
