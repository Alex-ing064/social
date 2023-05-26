var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Usuario_invitacionSchema = Schema({
    usuario_origen: { type: Schema.ObjectId, ref: 'usuario', require: true },
    usuario_destinatario: { type: Schema.ObjectId, ref: 'usuario', require: true },
    createdAt: { type: Date, default: Date.now },


});

module.exports = mongoose.model('usuario_invitacion', Usuario_invitacionSchema);