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
      return res.json(recipes);
      const returnRecipes = recipes.map((recipe) => {
        const newRecipe = recipe.toJSON();
    });
  }
  return { post, get };
}
module.exports = recipesController;
