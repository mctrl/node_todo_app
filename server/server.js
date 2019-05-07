const express = require('express')
const mysql = require('mysql');
const moment = require('moment');
const bodyParser = require('body-parser')
const app = express()


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bulbstudios_admin',
  password: 'UPWwBoxynISNm4Wa',
  database: 'bulbstudios'
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
app.delete('/delete/:id', (req, res) => {
  const query = `DELETE FROM todos WHERE id=${req.params.id} LIMIT 1`;
  connection.query(query, function (err, results, fields) {
    if (err) {
      res.status(500).send({error: 'ooops something went wrong'})
    } else {
      res.status(200).send({message: 'deleted successfully'});
    }
    })
})

app.get('/edit/:id', (req, res) => {
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

app.put('/edit/:id', (req, res) => {
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


app.post('/add', (req, res) => {
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