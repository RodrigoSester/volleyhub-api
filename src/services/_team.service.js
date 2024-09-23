import db from '../../database/config/index.js';

export async function register(team) {
  return await db('teams')
    .insert(team)
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'created_at'])
    .then((results) => results[0]);
};