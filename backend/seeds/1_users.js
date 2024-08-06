const {faker} = require ('@faker-js/faker')
const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const template = () => {return {un: faker.internet.userName(), pw_hash: hashme(faker.internet.password()), store_name: faker.company.name(), logo: faker.image.urlPicsumPhotos()}}
const hashme = async (pass) => {
  await bcrypt.hash(pass, 10)
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {un: 'root', pw_hash: hashme('pword'), store_name: null, logo: null}, 
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()}
  ]);
};
