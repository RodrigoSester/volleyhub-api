export function up(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.integer("team_away_id").nullable().alter();
  });
};

export function down(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.integer("team_away_id").notNullable().alter();
  });
};
