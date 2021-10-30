// to use express, it must be required
const express = require('express');
// add mongoose, which will deal with all the database stuff
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// express has been declared, and can be called
const app = express();
// connect mongoose to MongoDB
const db = mongoose.connect('mongodb://localhost/recipeAPI');
const Recipe = require('./models/recipeModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const recipeRouter = require('./routes/recipeRouter')(Recipe);
// later, there will be a tool that passes the port into the application.
// Until it is configured, 3000 serves as backup
const port = process.env.PORT || 3000;

app.use('/api', recipeRouter);

app.get('/', (req, res) => {
  res.send('Welcome to TapChef API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
