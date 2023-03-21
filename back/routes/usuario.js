var express = require('express');
var usuarioController = require('../controllers/usuarioController');

var app = express.Router();

app.post('/create_usuario', usuarioController.create_usuario);
module.exports = app;