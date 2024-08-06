/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inv').del()
  await knex('inv').insert([
    {un_id: 1, item_name: 'chocolate', desc: 'yum', quan: 0, img: null, price: 100}
  ]);
};
