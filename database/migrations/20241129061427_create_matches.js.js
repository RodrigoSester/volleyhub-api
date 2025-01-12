/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("matches", (table) => {
    table.increments("id").primary();

    table.integer("team_home_id").notNullable();
    table.foreign("team_home_id").references("id").inTable("teams");

    table.integer("team_away_id").notNullable();
    table.foreign("team_away_id").references("id").inTable("teams");

    table.enum("modality", ["female", "male", "mixed"]).notNullable();

    table.date("date").notNullable();
    table.integer("value").notNullable();

    table.integer("created_by").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("updated_by").references("id").inTable("users");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");

    table.index(["team_home_id", "team_away_id"], "idx_matches_team_home_id_team_away_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.dropTable("matches");
};
