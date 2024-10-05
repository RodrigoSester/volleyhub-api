import knex from 'knex';
import { config } from './config/index.js';

const databaseConfig = config;
const db = knex(databaseConfig);
export default db;