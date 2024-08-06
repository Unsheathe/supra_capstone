const express = require('express');
const cores = require('cors');
const app = express();
const port = 8080
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(express.json())
app.use(cores())

app.get('/', (req, res) => {
    knex('users').select().then((data) => res.send(data))
        .catch((err) => res.send(err))
})

// app.get('/:un_id', (req, res) => {
//     knex('users').select().then((data) => res.send(data))
//         .catch((err) => res.send(err))
// })

app.get('/test', (req, res) => {
    knex('inv').select().then((data) => res.send(data))
        .catch((err) => res.send(err))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})