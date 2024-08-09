const express = require('express');
const cores = require('cors');
const app = express();
const port = 8080
const knex = require('knex')(require('../knexfile.js')['development']);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const SECRET_KEY = 'string' //process.env.SECRET_KEY

app.use(express.json())
app.use(bodyParser.json())
app.use(cores())


// // //    ANYONE REQUESTS

//send a specific items details
app.get('/i/:id', (req, res) => {
  const {id} = req.params
  knex('inv').select().where("id", id).then((data) => res.send(data))
    .catch((err) => res.send(err))
})

//send all items regardless of distributer
app.get('/all', (req, res) => {
  knex('inv').select().then((data) => res.send(data)).catch((err) => res.send(err))
})

//verify login credentials
app.post("/login", async (req, res) => {
  try{
      const { user, pass, type } = req.body;
      let query = await knex('users').select("*").where("un", user);

      if (type === "login") {
        if (query.length === 1 && await bcrypt.compare(pass, query[0].pw_hash)) {
          const token = jwt.sign({ un: user }, SECRET_KEY, { expiresIn: '1d' });
          await knex('users').update({auth_token: token}).where("un", user);
          res.cookie('auth_token', token, { httpOnly: true, secure: false });
          res.status(200).json({ message: "Logging you in", token, id: query[0].id});
        } else {
          res.status(404).json({ message: "Incorrect username or password" });
        }
      } else if (type === "create") {
        if (query.length === 0) {
          const hashedPassword = await bcrypt.hash(pass, 10);
          await knex('users').insert({ un: user, pw_hash: hashedPassword, auth_token: ''});
          res.status(200).json({ message: "User created" });
        } else {
          res.status(401).json({ message: "User exists with that username already" });
        }}
    } catch (error) {
      console.log(error)
      res.status(404).json({error})
    }
});


// // //   ADMIN REQUESTS

//send all businesses (users table) data
app.get('/', (req, res) => {
  knex('users').select().then((data) => res.send(data)).catch((err) => res.status(500).send(err))
})

//create a new business
app.post('/', async (req, res) => {
  const {un, pw, store_name, logo} =req.body
  const pw_hash = await hashme(pw);
  knex('users').insert({un, pw_hash, store_name, logo, auth_token: ''}).then(() => {
    res.status(100)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

//delete a business
app.delete('/', async (req, res) => {
  const {store_name} = req.body
  try {
    // remove all inventory associated with that business
    await knex('inv')
      .join('users', 'inv.un_id', '=', 'users.id')
      .where('users.store_name', store_name)
      .del();

    // remove the business (user)
    const deleted = await knex('users').where({ store_name }).del();
    
    if (deleted) {
      res.send(`Removed ${store_name} and associated inventory.`);
    } else {
      res.status(404).send('Store not found.');
    }
  } catch (err) {
    res.status(500).send('Request to delete failed.');
    console.error(err);
  }
})

//for hashing passwords
const hashme = async (pass) => {
  return await bcrypt.hash(pass, 10);
};


// // //   USER REQUESTS

//send all items for a particular business
app.get('/:un_id', (req, res) => {
  const {un_id} = req.params
  knex('inv').select().where("un_id", un_id).then((data) => res.send(data))
    .catch((err) => res.send(err))
})

//create a new item
app.post('/:un_id', (req, res) => {
  const {un_id}=req.params
  const {item_name, desc, quan, img, price} = req.body
  knex('inv').insert({un_id, item_name, desc, quan, img, price}).then(() => {
    //res.send()
  }).catch((err) => {
    res.status(500).send(err)
  })
})

//delete an item
app.delete('/:un_id', (req, res) => {
  const {item_name} = req.body
  knex('inv').where({item_name}).del().then((count)=>{
    if (count) {
      //res.send()
    } else {
      res.status(404).send(`No ${item_name} to remove`)
    }
  }).catch((err) => {
    res.status(500).send(`Error: ${err}`)
  })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})