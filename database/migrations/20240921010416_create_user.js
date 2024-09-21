/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('document').notNullable();
    table.string('phone').notNullable();
    table.string('profile_photo').notNullable();
    table.integer('age').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users');
};
