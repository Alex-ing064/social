const bodyParser = require('body-parser');
var express = require('express');
var port = process.env.PORT || 4201;
var mongoose = require('mongoose');
var bodyparser = require('body-parser');


var app = express();

var test_routes = require('./routes/test');
var usuario_routes = require('./routes/usuario');


mongoose.connect('mongodb://127.0.0.1:27017/social', (err, res) => {
    if (err) console.log(err);
    else app.listen(port, function () {
        console.log("Servidor en puerto" + port);
    });
});

app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Allow', 'GET,PUT,POST,DELETE,OPTIONS');
    next();

});

app.use('/api', test_routes);
app.use('/api', usuario_routes);


module.exports = app;