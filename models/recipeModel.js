const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeModel = new Schema(
  {
    recipe_title: { type: String },
    author: { type: String },
    food_type: { type: String },
    cuisine: { type: String },
    main_ingredients: { type: String },
    url: { type: String },
    diet_restrictions: Schema.Types.Mixed,
    nutritional_info: Schema.Types.Mixed,
    occasion: { type: String },
    way_of_cooking: { type: String },
    time: Schema.Types.Mixed
  }
);

module.exports = mongoose.model('Recipe', recipeModel);
