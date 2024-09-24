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

export async function edit(playerDTO) {
  return await db('team_players')
    .where({ 'player_id': playerDTO.playerId })
    .update(playerDTO);
}

export async function remove(playerDTO) {
  return await db('team_players')
    .where({ 'player_id': playerDTO.playerId })
    .update({ 
      'is_deleted': true,
      'deleted_at': new Date().toISOString(),
      'deleted_by': playerDTO.userId,
    });
}