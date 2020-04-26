/* eslint-disable prefer-arrow-callback */
const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'x',
  user: 'x',
  password: 'x',
  database: 'Tasks',
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', function (request, response) {
  connection.query('SELECT * FROM Task', function (err, data) {
    if (err) {
      console.log('Error from SQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

app.delete('/tasks/:taskId', (request, response) => {
  // Should delete the task with the specified ID from the DB
  if (request.params.taskId > 3) {
    response.status(404).send(`Task ${request.params.taskId} does not exist`);
  } else {
    response.status(200).send(`You issued a delete request for ID: ${request.params.taskId}`);
  }
});

app.post('/tasks', (request, response) => {
  const data = request.body;
  // Should INSERT INTO the DB the new task
  response.status(201).send(`Received a request to add task of ${data.text}!`);
});

app.put('/tasks/:taskId', (request, response) => {
  const data = request.body;
  // Should delete the task with the specified ID from the DB
  if (request.params.taskId > 3) {
    response.status(404).send(`Task ${request.params.taskId} does not exist`);
  } else {
    response.status(200).send(`You issued a put request of ${JSON.stringify(data)}  for ID: ${request.params.taskId}`);
  }
});


module.exports.app = serverlessHttp(app);