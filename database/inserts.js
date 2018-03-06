const knex = require('./db');

const user = data => knex('users').insert({
  name: data.displayName,
  photo: data.photos[0].value,
  email: data.email
});

module.exports = {
	user,
}