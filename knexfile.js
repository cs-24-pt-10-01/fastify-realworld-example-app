const rapl = require('./rapl.js');
const configs = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    },
    useNullAsDefault: true
  }
};
module.exports = configs;
