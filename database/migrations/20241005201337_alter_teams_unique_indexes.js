/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.raw(`
    ALTER TABLE teams DROP CONSTRAINT IF EXISTS uq_team_modality_created_by;
    DROP INDEX IF EXISTS idx_team_modality_created_by;

    CREATE UNIQUE INDEX uq_team_modality_created_by ON teams (modality, created_by) WHERE NOT is_deleted;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.raw(`
    DROP INDEX IF EXISTS uq_team_modality_created_by;

    CREATE UNIQUE INDEX idx_team_modality_created_by ON teams (modality, created_by);
    
    ALTER TABLE teams ADD CONSTRAINT uq_team_modality_created_by UNIQUE (modality, created_by);
  `);
};
