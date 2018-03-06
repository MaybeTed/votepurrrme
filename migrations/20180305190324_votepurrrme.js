
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.string('email').unique();
    table.string('photo');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
