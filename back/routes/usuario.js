var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var auth =require('../middlewares/auth');
var app = express.Router();

app.post('/create_usuario', usuarioController.create_usuario);
app.post('/login_usuario', usuarioController.login_usuario);
app.get('/get_usuario/:id',auth.auth,usuarioController.get_usuario);
app.put('/update_usuario/:id',auth.auth,usuarioController.update_usuario);
app.put('/update_password/:id',auth.auth,usuarioController.update_password);
app.post('/validate_usuario',usuarioController.validate_usuario);

module.exports = app;