var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoriaSchema = Schema({
    imagen: { type: String, required: true },
    usuario: { type: Schema.ObjectId, ref: 'usuario', require: true },
    exp: { type: Date, require: true },
    createdAt: { type: Date, default: Date.now },


});

module.exports = mongoose.model('historia', HistoriaSchema);
