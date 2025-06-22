export function up(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.string("match_type");
    table.string("location");
    table.string("title").notNullable().defaultTo("");
  });
};

export function down(knex) {
  return knex.schema.alterTable("matches", (table) => {
    table.dropColumn("match_type");
    table.dropColumn("location");
    table.dropColumn("title");
  });
};
