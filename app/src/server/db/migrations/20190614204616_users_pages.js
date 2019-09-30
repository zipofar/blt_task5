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
      table.text('title').notNullable();
      table.text('greeting').notNullable();
      table.text('content');
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
