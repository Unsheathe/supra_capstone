const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const hashme = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const createUserTemplate = async () => {
  const hashedPassword = await hashme(faker.internet.password());
  return {
    un: faker.internet.userName(),
    pw_hash: hashedPassword,
    store_name: faker.company.name(),
    logo: faker.image.urlPicsumPhotos(),
    auth_token: ''
  };
};

exports.seed = async function(knex) {
  await knex('users').del();
  const adminpw = await hashme('pword');
  const peterpw = await hashme('great')
  const defaultUser1 = await createUserTemplate();
  const defaultUser2 = await createUserTemplate();
  const defaultUser3 = await createUserTemplate();
  const defaultUser4 = await createUserTemplate();
  const defaultUser5 = await createUserTemplate();
  await knex('users').insert([
    {un: 'admin', pw_hash: adminpw, store_name: null, logo: null, auth_token: ''},
    defaultUser1,
    {un: 'bathowner', pw_hash: peterpw, store_name: 'bathhouse', logo: faker.image.urlPicsumPhotos(), auth_token: ''},
    defaultUser2, defaultUser3, defaultUser4, defaultUser5
  ]);
}