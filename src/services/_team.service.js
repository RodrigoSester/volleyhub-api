import db from '../../database/config/index.js';

export async function getTeamById(teamId) {
  return await db('teams')
    .select('*')
    .where('id')
    .equalsTo(teamId);
}

export async function register(team) {
  return await db('teams')
    .insert(team)
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'created_at'])
    .then((results) => results[0]);
};

export async function edit(team) {
  return await db('teams')
    .update(team)
    .then((results) => results[0]);
}

export async function remove(teamId) {
  return await db('teams')
    .update(teamId)
    .then((results) => results[0]);
}