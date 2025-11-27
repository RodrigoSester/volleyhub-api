/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("match_team_player", (table) => {
    table.increments("id").primary();
    
    table.integer("team_match_id").notNullable();
    table.foreign("team_match_id").references("id").inTable("matches");
    
    table.integer("team_player_id").notNullable();
    table.foreign("team_player_id").references("id").inTable("team_players");
    
    table.enum("status", ["confirmed", "canceled", "pending", "refused"]).notNullable();
    
    table.timestamp("created_at").defaultTo(knex.fn.now());
    
    table.integer("updated_by").references("id").inTable("users");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
    
    table.index(["team_match_id"], "idx_match_team_player_team_match_id");
    table.index(["team_player_id"], "idx_match_team_player_team_player_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("match_team_player");
};
