const express = require('express');

function routes(Recipe) {
  const recipeRouter = express.Router();
  recipeRouter.route('/recipes')
    .post((req, res) => {
      const recipe = new Recipe(req.body);
      recipe.save();
      return res.status(201).json(recipe);
    })
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
  return recipeRouter;
}

module.exports = routes;
