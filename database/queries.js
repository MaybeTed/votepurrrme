const knex = require('./db');

const users = name => name
  ? knex('users').where('name', name).select()
  : knex('users').select();

const cats = id => id
  ? knex('cats').where('id', id).select()
  : knex('cats').select();

module.exports = {
	users,
	cats
};