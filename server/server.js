const express = require('express')
const mysql = require('mysql');
const moment = require('moment');
const bodyParser = require('body-parser')
const app = express()
const { check } = require('express-validator/check'); //input validation
const { sanitize, sanitizeBody } = require('express-validator/filter'); //input sanitazation
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet()); //setup secure headers
app.use(cors()); //access control middleware to enable CORS with various options.
app.use(morgan('combined')); //server logging
app.use(bodyParser.json()) // parse application/x-www-form-urlencoded

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
const port = 3000
const loggedInUser = 1; //replace with login system when there is one;

app.get('/getAll', (req, res) => {
    const query = `SELECT t.id, t.title, t.description, t.created, u.username 
    FROM todos as t 
    INNER JOIN users AS u 
    ON t.user=u.id
    ORDER BY t.created DESC`
    connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.send(results);
    }
    })

})

//sanitise inputs on these methods 
app.delete('/delete/:id', sanitize('id').escape().trim() ,(req, res) => {
  const query = `DELETE FROM todos WHERE id=${req.params.id} LIMIT 1`;
  connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.status(200).send({message: 'deleted successfully'});
    }
    })
})


//needs to return unescaped characters because it's loosing them
//decode before passing it to ui
app.get('/edit/:id', sanitize('id').escape().trim(), (req, res) => {
  const query = `SELECT t.id, t.title, t.description, t.created, u.username 
  FROM todos as t 
  INNER JOIN users AS u 
  ON t.user=u.id
  WHERE t.id=${req.params.id} LIMIT 1`
  connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.send(results);
    }
    })
})

app.put('/edit/:id', [
  sanitize('id').escape().trim(), 
  sanitize('title').trim().escape(),
  check('description').not().isEmpty().trim().escape()
  ], (req, res) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const query = `UPDATE todos SET 
  title="${req.body.title}",
  description="${req.body.description}",
  created="${now}"
  WHERE id=${req.params.id}
  LIMIT 1`
  connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.status(200).send({message: 'Updated successfully'});
    }
    })
})

//checking of the description is not happening
app.post('/add', [
  sanitize('title').trim().escape(),
  check('description').not().isEmpty().trim().escape()
  ], (req, res) => {
  const query = `INSERT INTO todos SET 
  title="${req.body.title}",
  description="${req.body.description}",
  user=${loggedInUser}`;
  connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.status(200).send({message: 'Added successfully'});
    }
    })
})


app.listen(port, () => console.log(`App is listening on port ${port}!`))