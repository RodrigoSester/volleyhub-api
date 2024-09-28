import db from '../../database/config/index.js';

export async function getById(teamId) {
  return await db('teams')
    .select('*')
    .from('teams')
    .where({ id: teamId });
}

export async function getAll() {
  return await db()
    .select("*")
    .from('teams');
}

export async function register(team) {
  return await db('teams')
    .insert({
      name: team.name,
      abbreviation: team.abbreviation,
      flag_url: team.flag_url,
      monthly_fee: team.monthly_fee,
      modality: team.modality,
      created_by: team.user_id,
    })
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'created_at'])
    .then((results) => results[0]);
};

export async function edit(team) {
  return await db('teams')
    .update({
      name: team.name,
      abbreviation: team.abbreviation,
      flag_url: team.flag_url,
      monthly_fee: team.monthly_fee,
      updated_by: team.user_id,
    })
    .where({ id: team.id })
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'updated_by', 'created_at', 'updated_at'])
    .then((results) => results[0]);
}

export async function remove(teamId) {
  return await db('teams')
    .update(teamId)
    .then((results) => results[0]);
}