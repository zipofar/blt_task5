exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').notNullable().defaultTo('user');
    }),

    knex.schema.createTable('pages', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('greeting').notNullable();
      table.string('content');
      table.bool('isprimary').notNullable().defaultTo('f');
      table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages'),
    knex.schema.dropTable('users'),
  ]);
};
