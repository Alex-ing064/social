var express = require('express');
var testController = require('../controllers/testController');
var auth =require('../middlewares/auth');

var app = express.Router();

app.get('/test_api',auth.auth,testController.test_api);

module.exports = app;