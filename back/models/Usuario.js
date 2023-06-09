var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    pais: {type: String, required: false},
    profesion: {type: String, required: false},
    nacimento: {type: Date, required: false},
    genero:{type:String, require:false},
    telefono: {type: String, required: false},
    avatar: {type: String, default: 'defecto.png', required: false},
    portada: {type: String, required: false},

    estado: {type: Boolean, default: false, required: false},
    descripcion: {type: String, required: false},
    username: {type: String, required: false},
    password: {type: String, required: true},
    code_reset: {type: String, required: false},



});

module.exports = mongoose.model('usuario',UsuarioSchema);
