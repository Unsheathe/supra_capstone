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

app.get('/', (req, res) => {
  knex('users').select().then((data) => res.send(data)).catch((err) => res.send(err))
})

app.get('/all', (req, res) => {
  knex('inv').select().then((data) => res.send(data)).catch((err) => res.send(err))
})

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

app.get('/:un_id', (req, res) => {
  const {un_id} = req.params
  knex('inv').select().where("un_id", un_id).then((data) => res.send(data))
    .catch((err) => res.send(err))
})

app.get('/inv', (req, res) => {
  knex('inv').select().then((data) => res.send(data))
    .catch((err) => res.send(err))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})