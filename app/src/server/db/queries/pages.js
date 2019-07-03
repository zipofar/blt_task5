const knex = require('../connection');

const fields = ['id', 'title', 'greeting', 'content', 'user_id'];

const getAll = (opts) => {
  const { limit = 10, offset = 0 } = opts;
  return knex
    .column('id', 'title', 'user_id')
    .select()
    .from('pages')
    .limit(limit)
    .offset(offset);
};

const countRecords = async () => {
  const { count } = await knex('pages').count('id').first();
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

module.exports = {
  getAll,
  getById,
  create,
  getAllByUser,
  getPrimaryPage,
  countRecords,
};
