const knex = require('./db');

const winner = cat => {
  knex('cats')
    .where('id', '=', cat)
    .increment('chances', 1)
    .then(knex('cats').where('id', '=', cat).increment('wins', 1).then(() => console.log('updated winner')));
};

const loser = cat => {
  knex('cats')
    .where('id', '=', cat)
    .increment('chances', 1)
    .then(() => console.log('updated loser'));
};

module.exports = {
	winner, 
	loser
}