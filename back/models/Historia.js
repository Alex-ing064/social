var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoriaSchema = Schema({
    imagen: { type: String, required: true },
    usuario: { type: Schema.ObjectId, ref: 'usuario', require: true },
    exp: { type: Date, require: true },
    createdAt: { type: Date, default: data.now },


});

module.exports = mongoose.model('historia', UsuarioSchema);