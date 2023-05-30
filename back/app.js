var express = require('express');
var port = process.env.PORT || 4201;
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");


var app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    // ...
    console.log('socket connected');
   socket.on('send-invitacion',function(data){
        io.emit('new-invitacion',data);
    }); 

    socket.on('set-invitacion',function(data){
        console.log('data');
        io.emit('set-new-invitacion',data);
    }); 
});

var test_routes = require('./routes/test');
var usuario_routes = require('./routes/usuario');
var historia_routes = require('./routes/historia');

mongoose.connect('mongodb://127.0.0.1:27017/social',(err,res)=>{
    if(err) console.log(err);
    else httpServer.listen(port,function(){
        console.log("umariana campus social, corriendo con exito en el servidor local "+ port);
    });
});

app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',test_routes);
app.use('/api',usuario_routes);
app.use('/api',historia_routes);

module.exports = app;