import db from '../../database/config/index.js';

export async function getAll() {
  return await db()
    .select("*")
    .from('team_players');
}

export async function getById(playerId) {
  return await db()
    .select('*')
    .from('team_players')
    .where({ 'player_id': playerId });
}
