var express = require('express');
var port = process.env.PORT || 4201;
var mongoose = require('mongoose');

var app = express();

var test_routes = require('./routes/test');

mongoose.connect('mongodb://127.0.0.1:27017/social',(err,res)=>{
    if(err) console.log(err);
    else app.listen(port,function(){
        console.log("Servidor corriendo con exito " + port);
    });
});

app.use('/api',test_routes);

module.exports = app;