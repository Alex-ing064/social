var express = require('express');
var historiasController = require('../controllers/historiasController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/createStory',[auth.auth,path],historiasController.createStory);
app.get('/obtener_historias_usuario',auth.auth,historiasController.obtener_historias_usuario);
app.get('/obtener_historia_img/:img',historiasController.obtener_historia_img);



module.exports = app;