import { config } from "./database/config/index.js";

import knex from 'knex';

export const databaseConfig = config;

knex(databaseConfig);