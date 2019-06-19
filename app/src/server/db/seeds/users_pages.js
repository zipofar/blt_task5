const buildPages = require('../data/pages');
const buildUsers = require('../data/users');

const countUsers = 5;
const countPages = 20;

exports.seed = knex => (
  knex('pages').del()
    .then(() => (knex('users').del()))
    .then(() => (knex('users').insert(buildUsers(countUsers))))
    .then(() => (knex('pages').insert(buildPages(countUsers, countPages))))
);
