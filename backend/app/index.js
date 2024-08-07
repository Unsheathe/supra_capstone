const express = require('express');
const cores = require('cors');
const app = express();
const port = 8080
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(express.json())
app.use(cores())

app.get('/', (req, res) => {
  knex('users').select().then((data) => res.send(data)).catch((err) => res.send(err))
})

app.post("/login", async (req, res) => {
  try{
      const { user, pass, type } = req.body;
      let query = await knex('users').select("*").where("username", user);

      if (type === "login") {
        if (query.length === 1 && await bcrypt.compare(pass, query[0].password)) {
          const token = jwt.sign({ username: user }, SECRET_KEY, { expiresIn: '1d' });
          await knex('users').update({auth_token: token}).where("username", user);
          res.cookie('auth_token', token, { httpOnly: true, secure: false });
          res.status(200).json({ message: "Logging you in", token });
        } else {
          res.status(404).json({ message: "Incorrect username or password" });
        }
      } else if (type === "create") {
        if (query.length === 0) {
          const hashedPassword = await bcrypt.hash(pass, 10);
          await knex('users').insert({ username: user, password: hashedPassword, auth_token: ''});
          res.status(200).json({ message: "User created" });
        } else {
          res.status(401).json({ message: "User exists with that username already" });
        }}
    } catch (error) {
      res.status(404).json({error})
    }
});

// app.get('/:un_id', (req, res) => {
//     knex('users').select().then((data) => res.send(data))
//         .catch((err) => res.send(err))
// })

app.get('/inv', (req, res) => {
  knex('inv').select().then((data) => res.send(data))
    .catch((err) => res.send(err))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})