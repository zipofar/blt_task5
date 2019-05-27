exports.up = knex => (
  knex.schema.createTable('pages', (table) => {
    table.increments();
    table.string('uri').unique().notNullable();
    table.string('greeting').notNullable();
    table.string('content');
  })
);

exports.down = knex => (
  knex.schema.dropTable('pages')
);
