const {faker} = require ('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const template = () => {return {
  un_id: num(6)+1, 
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
