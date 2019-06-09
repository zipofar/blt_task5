exports.up = knex => (
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('role').notNullable().defaultTo('user');
  })
);

exports.down = knex => (
  knex.schema.dropTable('users')
);
