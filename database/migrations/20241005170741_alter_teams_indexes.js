/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.raw(`
    DROP INDEX IF EXISTS idx_team_modality_created_by;
    CREATE UNIQUE INDEX idx_team_modality_created_by ON teams (modality, created_by) WHERE NOT is_deleted;
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.raw(`
    DROP INDEX IF EXISTS idx_team_modality_created_by;
    CREATE UNIQUE INDEX uq_teams_modality_created_by ON teams (modality, created_by);
  `)
};
