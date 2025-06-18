import db from '../../database/db.js';
import databaseHelper from '../helpers/database-helper.js';

export async function getById(teamId) {
  const result = await db.raw(`
    SELECT
      t.id,
      t."name",
      t.abbreviation,
      t.flag_url,
      t.monthly_fee,
      t.modality,
      t.created_at,
      ARRAY(
        SELECT JSONB_BUILD_OBJECT(
          'type', tp.type,
          'isActive', tp.is_active,
          'shirtNumber', tp.shirt_number,
          'name', u."name"
        )
        FROM team_players tp
        LEFT JOIN users u ON tp.player_id = u.id
        WHERE tp.team_id = t.id AND (not tp.is_deleted) AND tp.is_active
      ) AS players
    FROM teams t
    WHERE t.id = ?
      AND (NOT t.is_deleted);
  `, [teamId]);

  return databaseHelper.camelCase(result.rows)[0];
}

export async function getAll() {
  return await db('teams')
    .select("*")
    .from('teams')
    .where({ is_deleted: false });
}

export async function register(team) {
  return await db('teams')
    .insert({
      name: team.name,
      abbreviation: team.abbreviation,
      flag_url: team.flagUrl,
      monthly_fee: team.monthlyFee,
      modality: team.modality,
      created_by: team.userId,
    })
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'created_at'])
    .then((results) => results[0]);
};

export async function edit(team) {
  return await db('teams')
    .update({
      name: team.name,
      abbreviation: team.abbreviation,
      flag_url: team.flagUrl,
      monthly_fee: team.monthlyFee,
      updated_by: team.userId,
    })
    .where({ id: team.id, is_deleted: false })
    .returning(['id', 'name', 'abbreviation', 'flag_url', 'monthly_fee', 'modality', 'created_by', 'updated_by', 'created_at', 'updated_at'])
    .then((results) => results[0]);
}

export async function remove(teamId, userId) {
  return await db('teams')
    .update({
      deleted_at: new Date(),
      deleted_by: userId,
      is_deleted: true,
    })
    .where({ id: teamId, is_deleted: false })
    .then((results) => results[0]);
}

export async function getTeamsByUserId(userId) {
  return await db('teams')
    .select('*')
    .from('teams')
    .where({ created_by: userId, is_deleted: false });
}

export async function getTeamsWhereUserIsNotMember(userId) {
  return await db('teams')
    .select('teams.*')
    .leftJoin('team_players', function() {
      this.on('teams.id', '=', 'team_players.team_id')
          .andOn('team_players.player_id', '=', db.raw('?', [userId]))
          .andOn('team_players.is_deleted', '=', db.raw('false'));
    })
    .where('teams.is_deleted', false)
    .whereNull('team_players.id')
    .orderBy('teams.created_at', 'desc');
}