/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {un: 'root', pw_hash: 'deffaHashedPw', store_name: null, logo: null}
  ]);
};
