import db from '../../database/db.js';

export async function getMatchesByUser(userId) {
  return await db('matches')
    .select('m.id', 'm.title', 'm.team_home_id', 'm.team_away_id', 'm.date', 'm.modality', 'm.value', 'm.match_type', 'm.adress', 'mtp.status').distinct()
    .from('matches as m')
    .leftJoin('teams', db.raw('m.team_home_id = teams.id OR m.team_away_id = teams.id'))
    .join('team_players', db.raw('team_players.team_id = teams.id AND (NOT team_players.is_deleted) AND team_players.is_active AND team_players.player_id = ?', [userId]))
    .join('match_team_player as mtp', function() {
      this.on('mtp.team_match_id', '=', 'm.id')
          .andOn('mtp.team_player_id', '=', 'team_players.id')
          .andOn('mtp.is_deleted', '=', db.raw('false'))
    })
    .where('m.is_deleted', false)
}

export async function register(match) {
  return await db('matches')
    .insert({
      title: match.title,
      team_home_id: match.teamHomeId,
      team_away_id: match?.teamAwayId || null,
      date: match.date,
      modality: match.modality,
      match_type: match.type,
      adress: match.adress,
      value: match?.value,
    })
    .returning(['id', 'team_home_id', 'team_away_id', 'date', 'modality', 'value'])
    .then((results) => results[0]);
}

export async function registerMatchTeamPlayers(matchId, teamHomeId, teamAwayId) {
  const teamIds = [teamHomeId];
  if (teamAwayId) {
    teamIds.push(teamAwayId);
  }

  // Get all active players from both teams
  const teamPlayers = await db('team_players')
    .select('id')
    .whereIn('team_id', teamIds)
    .where('is_active', true)
    .where('is_deleted', false);

  if (teamPlayers.length === 0) {
    return [];
  }

  // Create match_team_player records with pending status
  const matchTeamPlayerRecords = teamPlayers.map(player => ({
    team_match_id: matchId,
    team_player_id: player.id,
    status: 'pending'
  }));

  return await db('match_team_player')
    .insert(matchTeamPlayerRecords)
    .returning(['id', 'team_match_id', 'team_player_id', 'status']);
}