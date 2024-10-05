import config from "./database/config/index.js";

import knex from 'knex';

const databaseConfig = config;
knex(databaseConfig);

export default databaseConfig ;