const buildPages = require('../data/pages');
const buildUsers = require('../data/users');

exports.seed = knex => (
  knex('pages').del()
    .then(() => (knex('users').del()))
    .then(() => (knex('users').insert(buildUsers(5))))
    .then(() => (knex('pages').insert(buildPages(5, 50))))
);
