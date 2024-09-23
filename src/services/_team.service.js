import db from '../../database/config/index.js';

export async function register(team) {
  return await db('teams')
    .insert(team)
    .returning('*')
    .then((results) => results[0]);
};