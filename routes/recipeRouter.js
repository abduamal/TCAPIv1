/* eslint-disable no-param-reassign */
const express = require('express');
const recipesController = require('../controllers/recipesController');

function routes(Recipe) {
  const recipeRouter = express.Router();
  const controller = recipesController(Recipe);
  recipeRouter.route('/recipes')
    .post(controller.post)
    .get(controller.get);

  recipeRouter.use('/recipes/:recipeId', (req, res, next) => {
    Recipe.findById(req.params.recipeId, (err, recipe) => {
      if (err) {
        return res.send(err);
      }
      if (recipe) {
        req.recipe = recipe;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  recipeRouter.route('/recipes/:recipeId')
    .get((req, res) => res.json(req.recipe))
    .put((req, res) => {
      const { recipe } = req;
      recipe.recipe_title = req.body.recipe_title;
      recipe.author = req.body.author;
      recipe.food_type = req.body.food_type;
      recipe.cuisine = req.body.cuisine;
      recipe.main_ingredients = req.body.main_ingredients;
      recipe.url = req.body.url;
      recipe.diet_restrictions = req.body.diet_restrictions;
      recipe.nutritional_info = req.body.nutritional_info;
      recipe.occasion = req.body.occasion;
      recipe.way_of_cooking = req.body.way_of_cooking;
      recipe.time = req.body.time;
      recipe.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipe);
      });
    })
    .patch((req, res) => {
      const { recipe } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((element) => {
        const key = element[0];
        const value = element[1];
        recipe[key] = value;
      });
      recipe.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipe);
      });
    })
    .delete((req, res) => {
      req.recipe.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return recipeRouter;
}

module.exports = routes;
