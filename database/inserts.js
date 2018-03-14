const knex = require('./db');

const user = data => knex('users').insert({
  name: data.displayName,
  photo: data.photos[0].value,
  email: data.email
});

const comment = data => knex('comments').insert({
	message: data.message,
	user_id: data.userid,
	cat_id: data.catid
});

module.exports = {
	user,
	comment
}