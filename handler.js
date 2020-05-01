/* eslint-disable prefer-arrow-callback */
const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
  const query = `DELETE FROM Task WHERE TaskId = ?`;
  connection.query(query, [request.params.taskId], function (err) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send(`Task successfully deleted!`)
    }
  });
});

app.post("/tasks", function (request, response) {
  const data = request.body;
  const query = `INSERT INTO Task (Text, DueDate, Category, Priority, Completed, UserId) VALUES (?,?,?,?,?,?)`;
  connection.query(query, [data.Text, data.DueDate, data.Category, data.Priority, false, data.UserId], function (err, results) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      connection.query(`SELECT * FROM Task WHERE TaskId = ${results.insertId}`, function (err, results) {
        if (err) {
          console.log("Error from MySQL", err);
          response.status(500).send(err);
        } else {
          response.status(201).send(results[0]);
        }
      });
    }
  });
});

app.put('/tasks/:taskId', (request, response) => {
  const data = request.body;
  const query = 'UPDATE Task SET? WHERE TaskId=?';
  connection.query(query, [data, request.params.taskId], function (err) {
    if (err) {
      console.log("Error from MySQL", err);
      response.status(500).send(err);
    } else {
      response.status(200).send("Task successfully updated!");
    }
  });
});


module.exports.app = serverlessHttp(app);