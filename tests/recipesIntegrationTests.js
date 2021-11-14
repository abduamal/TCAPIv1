require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';
const app = require('../app');

const Recipe = mongoose.model('Recipe');
const agent = request.agent(app);
