
exports.up = function(knex, Promise) {
  return knex.schema.createTable('followers', function(table) {
  	table.increments('id').unsigned().primary();
  	table.integer('follower').references('users.id');
  	table.integer('following').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('followers')
};
