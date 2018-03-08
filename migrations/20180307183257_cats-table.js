
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cats', function(table) {
  	table.increments('id').unsigned().primary();
  	table.string('name');
  	table.string('url');
  	table.integer('wins').defaultTo(0);
  	table.integer('chances').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cats')
};
