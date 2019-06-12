exports.up = knex => (
  knex.schema.createTable('pages', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('greeting').notNullable();
    table.string('content');
    table.integer('user_id').notNullable().references('id').inTable('users');
  })
);

exports.down = knex => (
  knex.schema.dropTable('pages')
);
