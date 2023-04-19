var express = require('express');
var usuarioController = require('../controllers/usuarioController');

var app = express.Router();

app.post('/create_usuario', usuarioController.create_usuario);
app.post('/login_usuario', usuarioController.login_usuario);
app.get('/get_usuario/:id',usuarioController.get_usuario);
app.put('/update_usuario/:id',usuarioController.update_usuario);

module.exports = app;