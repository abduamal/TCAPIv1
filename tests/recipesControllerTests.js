const should = require('should');

const sinon = require('sinon');

const recipeController = require('../controllers/recipesController');

describe('Recipe Controller Tests:', () => {
  // replicate the actions in recipesController
  // (ex.) for POST
  // recipesController takes Recipe, creates an instance of it with req.body
  // save the instance, then respond with a status and the book instance in json

  describe('Post', () => {
    it('should not allow an empty recipe title on post', () => {
      const Recipe = function (recipe) { this.save = () => {}};
      const req = {
        body: {
          author: 'Amal'
        }
      };
      // creates a spy function using the Sinon framework which would keep track of
      //    what's called, what it's called with, how many times, and more..
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = recipeController(Recipe);
      controller.post(req, res);
      // should is an assertion framework that throws an error if the results are not correct
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Recipe title is required').should.equal(true);
    });
  });
});
