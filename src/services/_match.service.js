import db from '../../database/db.js';

export async function getMatchesByUser(userId) {
  return await db('matches')
    .select('m.id', 'm.team_home_id', 'm.team_away_id', 'm.date', 'm.modality', 'm.value', 'm.match_type', 'address').distinct()
    .from('matches as m')
    .leftJoin('teams', db.raw('m.team_home_id = teams.id OR m.team_away_id = teams.id'))
    .leftJoin('team_players', db.raw('team_players.team_id = teams.id AND (NOT team_players.is_deleted) AND team_players.is_active AND team_players.player_id = ?', [userId]))
    .where('m.is_deleted', false)
}

export async function register(match) {
  return await db('matches')
    .insert({
      team_home_id: match.teamHomeId,
      team_away_id: match.teamAwayId,
      date: match.date,
      modality: match.modality,
      match_type: match.type,
      address: match.location,
      value: match.value,
    })
    .returning(['id', 'team_home_id', 'team_away_id', 'date', 'modality', 'value'])
    .then((results) => results[0]);
}