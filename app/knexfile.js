const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

const config = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'blt5',
      password: 'blt5',
      database: 'blt5',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};

module.exports = config;
