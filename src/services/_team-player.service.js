import db from '../../database/db.js';

export async function getAll() {
  return await db('team_players')
    .select('id', 'team_id', 'player_id', 'is_active', 'type', 'shirt_number')
    .where({ 'is_deleted': false })
    .orderBy('shirt_number', 'asc')
    .then((results) => results);
}

export async function getById(playerId) {
  return await db()
    .select('tp.id', 'tp.team_id', 'tp.player_id', 'tp.is_active', 'tp.type', 'tp.shirt_number')
    .from('team_players as tp')
    .innerJoin('users as u', 'tp.player_id', 'u.id')
    .select(
      'u.name as player_name', 
      'u.email as player_email', 
      'u.phone as player_phone', 
      'u.profile_photo as player_photo', 
      'u.document as player_document'
    )
    .where({ 'tp.id': playerId, 'tp.is_deleted': false })
    .first();
}

export async function register(playerDTO) {
  return await db('team_players')
    .insert({
      'team_id': playerDTO.teamId,
      'player_id': playerDTO.playerId,
      'is_active': playerDTO.isActive,
      'shirt_number': playerDTO?.shirtNumber,
      'type': playerDTO.type,
      'created_at': new Date().toISOString(),
      'created_by': playerDTO.userId,
    })
    .returning('id', 'team_id', 'player_id', 'is_active', 'type', 'shirt_number')
    .first();
}

export async function edit(playerDTO) {
  return await db('team_players')
  .update({
    'is_active': playerDTO.is_active,
    'shirt_number': playerDTO.shirt_number,
    'type': playerDTO.type,
    'updated_at': new Date().toISOString(),
    'updated_by': playerDTO.userId,
  })
  .where({ 'player_id': playerDTO.playerId, 'is_deleted': false })
  .returning(['id', 'team_id', 'player_id', 'is_active', 'type', 'shirt_number'])
  .then((results) => results[0]);
}

export async function remove(playerDTO) {
  return await db('team_players')
    .update({ 
      'is_deleted': true,
      'deleted_at': new Date().toISOString(),
      'deleted_by': playerDTO.userId,
    })
    .where({ 'id': playerDTO.id, 'is_deleted': false })
    .then((results) => results[0]);
}