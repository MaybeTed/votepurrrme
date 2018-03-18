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

module.exports = {
	favorites,
	follower,
	comment,
}