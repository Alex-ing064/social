var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Usuario_amigoSchema = Schema({
    usuario_origen: { type: Schema.ObjectId, ref: 'usuario', require: true },
    usuario_amigo: { type: Schema.ObjectId, ref: 'usuario', require: true },
    createdAt: { type: Date, default: Date.now },


});

module.exports = mongoose.model('usuario_amigo', Usuario_amigoSchema);