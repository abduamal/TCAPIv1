function recipesController(Recipe) {
  function post(req, res) {
    const recipe = new Recipe(req.body);
    if (!req.body.recipe_title) {
      res.status(400);
      return res.send('Recipe title is required');
    }
    recipe.save();
    res.status(201);
    return res.json(recipe);
  }
  function get(req, res) {
    const { query } = req;
    Recipe.find(query, (err, recipes) => {
      if (err) {
        return res.send(err);
      }
      const returnRecipes = recipes.map((recipe) => {
        const newRecipe = recipe.toJSON();
        newRecipe.links = {};
        newRecipe.links.self = `http://${req.headers.host}/api/recipes/${recipe._id}`;
        return newRecipe;
      });
      return res.json(returnRecipes);
    });
  }
  return { post, get };
}
module.exports = recipesController;
