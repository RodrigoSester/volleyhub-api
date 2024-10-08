/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable("teams", (table) => {
    table.index(["modality", "created_by"], "idx_team_modality_created_by");
    table.unique(["modality", "created_by"], "uq_team_modality_created_by");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable("teams", (table) => {
    table.dropIndex(["modality", "created_by"], "idx_team_modality_created_by");
    table.dropUnique(["modality", "created_by"], "uq_team_modality_created_by");
  });
};
