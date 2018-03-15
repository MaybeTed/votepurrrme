const knex = require('./db');

const favorites = (user, cat) => knex('favorites')
  .where('cat_id', cat)
  .andWhere('user_id', user)
  .del();

module.exports = {
	favorites
}