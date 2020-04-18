const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');

// Logically separate 4 sections of code according to the methof od the HTTP request received. 

// Export a single function, called app

const app = express();
app.use(cors());

app.get('/tasks', (request, response) => {

  // Should make a SELECT * FROM tasks query to the DB and return the results.
  // For now, it's just going to return some dummy data

  // Request has loads of information about the request
  // Response has some useful methods for sending a response

  response.status(200).send({
    tasks: [
      {
        id: 1,
        text: 'Homework',
        completed: true,
        date: "2020-04-20"
      },
      {
        id: 2,
        text: 'groceries',
        completed: true,
        date: "2020-04-25"
      },
      {
        id: 3,
        text: 'Buy new mat',
        completed: false,
        date: "2020-04-21"
      },
    ],
  });
});

app.delete('/tasks/:taskId', (request, response) => {

  // Should delete the task with the specified ID from the DB
  // For now, just send back a text message(and status 200)
  if (request.params.taskId > 3) {
    response.status(404).send({
      message: "Task " + request.params.taskId + " does not exist"
    });
  } else {
    response.status(200).send({
      message: "You issued a delete request for ID: " + request.params.taskId
    });
  }
});

app.post('/tasks', (request, response) => {
  // Should INSERT INTO the DB the new task
  // For now, just send back a text message(and status 200) "New task saved"
  response.status(201).send({
    message: 'Received a request to add task collect parcel with date 2020-04-25',
  });
});

app.put('/tasks/:taskId', (request, response) => {

  // Should delete the task with the specified ID from the DB
  // For now, just send back a text message(and status 200)
  if (request.params.taskId > 3) {
    response.status(404).send({
      message: "Task " + request.params.taskId + " does not exist"
    });
  } else {
    response.status(200).send({
      message: "You issued a put request for ID: " + request.params.taskId
    });
  }
});


module.exports.app = serverlessHttp(app);