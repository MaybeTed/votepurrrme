const knex = require('./db');

const favorites = (user, cat) => knex('favorites')
  .where('cat_id', cat)
  .andWhere('user_id', user)
  .del();

const follower = (users) => knex('followers')
  .where('follower', users.follower)
  .andWhere('following', users.following)
  .del();

const comment = (id) => knex('comments')
  .where('id', id)
  .del();

const user = (id) => knex('users')
  .where('id', id)
  .del();

const userComments = (id) => knex('comments')
  .where('user_id', id)
  .del();

const allRelationships = (id) => knex('followers')
  .where('following', id)
  .orWhere('follower', id)
  .del();

const userFavorites = (id) => knex('favorites')
  .where('user_id', id)
  .del();

module.exports = {
	favorites,
	follower,
	comment,
  user, 
  userComments,
  allRelationships,
  userFavorites
}