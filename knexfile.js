import { developmentConfig } from "./database/config/index.js";

import knex from 'knex';

export const development = developmentConfig;

knex(development);