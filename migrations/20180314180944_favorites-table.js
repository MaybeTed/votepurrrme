
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table) {
  	table.increments('id').unsigned().primary();
  	table.integer('user_id').references('users.id');
  	table.integer('cat_id').references('cats.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')  
};
