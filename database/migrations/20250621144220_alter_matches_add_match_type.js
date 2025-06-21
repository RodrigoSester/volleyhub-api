export function up(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.string("match_type");
    table.string("location");
  });
};

export function down(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.dropColumn("match_type");
    table.dropColumn("location");
  });
};
