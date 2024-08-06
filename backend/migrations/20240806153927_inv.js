/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inv', (table) => {
    table.integer('un_id') //this needs to grab from somewhere
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
