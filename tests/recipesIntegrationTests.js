require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';
const app = require('../app');

const Recipe = mongoose.model('Recipe');
const agent = request.agent(app);

describe('Recipe CRUD Test', () => {
  it('should allow a recipe to be posted and return _id', (done) => {
    const recipePost = {
      recipe_title: 'Awesome Tasting Dish', author: 'Njeshe Amal', food_type: 'breakfast', cuisine: 'American', main_ingredients: 'Eggs, Bacon, Flour, Sugar', all_ingredients: 'Eggs, Bacon, Flour, Sugar, Butter, Milk, Salt, Olive Oil, Black Pepper', url: 'https://falserecipeaddress.com', diet_restrictions: 'all a dem', nutritional_info: 'none a dem', occasion: 'integration testing', way_of_cooking: 'hot air', time: '60 seconds'
    };
    agent.post('/api/recipes')
      .send(recipePost)
      .expect(200)
      .end((error, results) => {
        // console.log(results);
        // results.body.recipe_title.should.not.equal('Awesome Tasting Dish');
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Recipe.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
