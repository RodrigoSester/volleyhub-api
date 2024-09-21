import { developmentConfig } from "./database/config/index.js";

import knex from 'knex';

export const development = developmentConfig;

const db = knex(development);
export default db;