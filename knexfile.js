let config;

try {
  config = require('./config.js');
} catch (err) {
  console.log('cant find config file: ', err);
}

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER || config.username,
      password: process.env.DATABASE_PASSWORD || config.password,
      database: process.env.DATABASE_NAME || 'votepurrrme',
    }
  }

};
