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

const follower = data => knex('followers').insert({
	follower: data.follower,
	following: data.following
});

const favorite = data => knex('favorites').insert({
	user_id: data.user,
	cat_id: data.cat
});

module.exports = {
	user,
	comment,
	follower,
	favorite
}