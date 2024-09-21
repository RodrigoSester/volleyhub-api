import dotenv from 'dotenv';
import knex from 'knex';

export const developmentConfig = {
  client: 'pg',
  connection: {
    port: dotenv.config().parsed.DB_PORT,
    host: dotenv.config().parsed.DB_HOST,
    user: dotenv.config().parsed.DB_USER,
    password: dotenv.config().parsed.DB_PASSWORD,
    database: dotenv.config().parsed.DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

const db = knex(developmentConfig);
export default db;