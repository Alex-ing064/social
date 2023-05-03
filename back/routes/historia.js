var express = require('express');
var historiasController = require('../controllers/historiasController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/createStory',[auth.auth,path],historiasController.createStory);

module.exports = app;