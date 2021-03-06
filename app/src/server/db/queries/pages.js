const knex = require('../connection');

const fields = ['id', 'title', 'greeting', 'content', 'user_id'];

const getAll = (opts) => {
  const { limit = 10, offset = 0 } = opts;
  return knex
    .column('id', 'title', 'greeting', 'user_id')
    .select()
    .from('pages')
    .where({ isprimary: false })
    .limit(limit)
    .offset(offset);
};

const countRecords = async () => {
  const { count } = await knex('pages').where({ isprimary: false }).count('id').first();
  return count;
};

const getPrimaryPage = async () => {
  const page = await knex('pages').where('isprimary', 'true').select().first();
  return typeof page === 'undefined' ? false : page;
};

const getAllByUser = (userId, opts) => {
  const { limit = 10, offset = 0 } = opts;
  return knex
    .select()
    .where('user_id', userId)
    .from('pages')
    .limit(limit)
    .offset(offset);
};

const getById = async (id) => {
  const page = await knex('pages').where('id', id).select().first();
  return typeof page === 'undefined' ? false : page;
};

const create = async (data) => {
  const page = await knex('pages').returning(fields).insert(data);
  return page[0];
};

const update = async (data, id) => {
  const page = await knex('pages')
    .where({ id })
    .returning(fields)
    .update(data);
  return page[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  getAllByUser,
  getPrimaryPage,
  countRecords,
};
