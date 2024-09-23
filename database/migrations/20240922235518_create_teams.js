/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable().unique();
    table.string("abbreviation", 5).notNullable();
    table.string("flag_url");
    table.integer("monthly_fee");
    table.enum("modality_enum").notNullable();
    table.integer("created_by").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("updated_by").references("id").inTable("users");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
    table.integer("deleted_by").references("id").inTable("users");

    table.index(["name", "abbreviation"], "idx_team_name_abbreviation").unique();
    table.index("modality", "idx_team_modality");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("teams");
};
