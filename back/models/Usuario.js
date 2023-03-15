var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombres: {type: String, required: false},
    apellidos: {type: String, required: false},
    email: {type: String, required: true},
    pais: {type: String, required: false},
    profesion: {type: String, required: false},
    nacimento: {type: Date, required: false},
    telefono: {type: String, required: false},
    avatar: {type: String, default: 'defecto.png', required: false},

    estado: {type: Boolean, default: false, required: false},
    descripcion: {type: String, required: false},
    username: {type: String, required: false},
    password: {type: String, required: true},
});

module.exports = mongoose.model('usuario',UsuarioSchema);