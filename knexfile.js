let config = process.env.NODE_ENV === 'production' ? null : require('./config.js')

// try {
//   config = require('./config.js');
// } catch (err) {
//   console.log('cant find config file: ', err);
// }

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER || config.username,
      password: process.env.DATABASE_PASSWORD || config.password,
      database: process.env.DATABASE_NAME || 'votepurrrme',
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.NODE_ENV
  },

};
