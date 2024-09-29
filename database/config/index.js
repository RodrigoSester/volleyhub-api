import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export const developmentConfig = {
  client: 'pg',
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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