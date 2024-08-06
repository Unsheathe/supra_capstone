import faker from 'faker'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const template = () => {return {un: faker.internet.userName(), pw_hash: faker.internet.password(), store_name: faker.company.name(), logo: faker.image.urlPicsumPhotos()}}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {un: 'root', pw_hash: 'deffaHashedPw', store_name: null, logo: null}, 
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()}
  ]);
};
