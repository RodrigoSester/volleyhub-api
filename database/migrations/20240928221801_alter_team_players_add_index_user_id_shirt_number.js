/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('team_players', (table) => {
    table.index(['player_id', 'shirt_number'], 'idx_team_players_player_id_shirt_number');
    table.unique(['team_id', 'shirt_number'], 'idx_team_players_team_id_shirt_number');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('team_players', (table) => {
    table.dropIndex(['player_id', 'shirt_number'],'idx_team_players_player_id_shirt_number');
    table.dropUnique(['team_id', 'shirt_number'], 'idx_team_players_team_id_shirt_number');
  });
};
