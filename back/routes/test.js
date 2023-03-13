var express = require('express');
var testController = require('../controllers/testController');

var app = express.Router();

app.get('/test_api',testController.test_api);

module.exports = app;