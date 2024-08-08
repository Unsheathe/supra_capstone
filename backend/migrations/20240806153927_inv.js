/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inv', (table) => {
    table.increments()
    table.integer('un_id')
    table.foreign('un_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('item_name')
    table.string('desc')
    table.integer('quan')
    table.string('img')
    table.integer('price')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inv')
};
