/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("team_players", (table) => {
    table.increments("id").primary();
    table.integer("team_id").notNullable();
    table.integer("player_id").notNullable();
    table.varchar("type").defaultTo("player");
    table.integer("shirt_number");
    table.boolean("is_active").defaultTo(true);

    table.integer("created_by").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("updated_by").references("id").inTable("users");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
    table.integer("deleted_by").references("id").inTable("users");

    table.foreign("team_id").references("id").inTable("teams");
    table.foreign("player_id").references("id").inTable("users");

    table.index(["team_id", "player_id"], "idx_team_players_team_id_player_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("team_players");
};
