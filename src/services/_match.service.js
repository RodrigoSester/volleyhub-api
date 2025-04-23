import db from '../../database/db.js';

export async function getMatchesByUser(userId) {
  return await db('matches')
    .select('m.id', 'm.team_home_id', 'm.team_away_id', 'm.date', 'm.modality', 'm.value').distinct()
    .from('matches as m')
    .leftJoin('teams', db.raw('m.team_home_id = teams.id OR m.team_away_id = teams.id'))
    .leftJoin('team_players', db.raw('team_players.team_id = teams.id AND (NOT team_players.is_deleted) AND team_players.is_active AND team_players.player_id = ?', [userId]))
    .where('m.is_deleted', false)
}