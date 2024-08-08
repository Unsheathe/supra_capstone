/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('un').notNullable().unique()
    table.string('pw_hash', 1000)
    table.string('store_name')
    table.string('logo', 1000)
    table.string('auth_token', 1000)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
