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
  .orderBy('wins', 'desc')
  .orderBy('chances', 'asc');

const searchUsers = q => knex('users')
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .select()

const searchCats = q => knex('cats')
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .select()

const catComments = cat => knex('comments')
  .where('cat_id', cat)
  .join('users', 'comments.user_id', '=', 'users.id')
  .orderBy('id', 'desc')
  .select('comments.*', 'users.name')

const userComments = user => knex('comments')
  .where('user_id', user)
  .join('users', 'comments.user_id', '=', 'users.id')
  .join('cats', 'comments.cat_id', '=', 'cats.id')
  .select('comments.*', 'users.name', 'cats.url')

module.exports = {
	users,
	userid,
	cats,
	rankCats,
	searchUsers,
	searchCats,
  catComments,
  userComments,
};