
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id').unsigned().primary();
    table.string('message');
    table.integer('user_id').references('users.id');
    table.integer('cat_id').references('cats.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
