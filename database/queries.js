const knex = require('./db');

const users = name => name
  ? knex('users').where('name', name).select()
  : knex('users').select();

const userid = id => knex('users')
  .where('id', id)
  .select();

const cats = id => id
  ? knex('cats').where('id', id).select()
  : knex('cats').select();

const rankCats = () => knex('cats')
  .select()
  .orderBy('wins', 'desc');

const searchUsers = q => knex('users')
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .select()

const searchCats = q => knex('cats')
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .select()

module.exports = {
	users,
	userid,
	cats,
	rankCats,
	searchUsers,
	searchCats
};