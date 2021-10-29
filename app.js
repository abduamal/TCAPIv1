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

const recipeRouter = express.Router();
// later, there will be a tool that passes the port into the application.
// Until it is configured, 3000 serves as backup
const port = process.env.PORT || 3000;
// with every get request, this app will respond with a function that has the request and response
// we look at the request, then do something to respond back
// this is a get handler
recipeRouter.route('/recipes')
  .get((req, res) => {
    const { query } = req;
    Recipe.find(query, (err, recipes) => {
      if (err) {
        return res.send(err);
      }
      return res.json(recipes);
    });
  });

recipeRouter.route('/recipes/:recipeId')
  .get((req, res) => {
    Recipe.findById(req.params.recipeId, (err, recipe) => {
      if (err) {
        return res.send(err);
      }
      return res.json(recipe);
    });
  });

app.use('/api', recipeRouter);

app.get('/', (req, res) => {
  res.send('Welcome to TapChef API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
