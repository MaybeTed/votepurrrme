const knex = require('./db');

const users = name => name
  ? knex('users').where('name', name).select()
  : knex('users').select();