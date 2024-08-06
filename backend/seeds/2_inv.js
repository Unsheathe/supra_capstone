const {faker} = require ('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const template = () => {return {
  un_id: num(6), 
  item_name: faker.commerce.product(), 
  desc: faker.commerce.productDescription(), 
  quan: num(10), 
  img: faker.image.urlPicsumPhotos(), 
  price: num(100)}}
const num = (max) =>{return Math.floor(Math.random()*max)+1}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inv').del()
  await knex('inv').insert([
    {un_id: 1, item_name: 'chocolate', desc: 'yum', quan: 0, img: null, price: 100},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()},
    {...template()}
  ]);
};
