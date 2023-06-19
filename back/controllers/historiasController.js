var Usuario_amigo = require('../models/Usuario_amigo');
var Historia = require('../models/Historia');
var fs = require('fs');
var path = require('path');

const createStory = async function (req, res) {
    if (req.user) {

        let img_path = req.files.imagen.path.split('\\')[2];

        let exp = new Date();
        exp.setDate(exp.getDate() + 1);

        let historia = await Historia.create({
            usuario: req.user.sub,
            imagen: img_path,
            exp: exp
        });

        res.status(200).send({ data:historia });

    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
}


const obtener_historias_usuario = async function (req, res) {
    if (req.user) {
        let amigos = await Usuario_amigo.find({ usuario_origen: req.user.sub }).populate('usuario_amigo');

        let today = Date.parse(new Date()) / 1000;
        var historias_vigentes_ = [];

        for (var item of amigos) {
            var historias_vigentes = [];
            var historias = await Historia.find({ usuario: item.usuario_amigo._id }).populate('usuario');


            for (var subitem of historias) {
                var tt_created = Date.parse(subitem.createdAt) / 1000;
                var tt_exp = Date.parse(subitem.exp) / 1000;

                if (today >= tt_created && today <= tt_exp) {
                    historias_vigentes.push(subitem);
                    historias_vigentes_.push(subitem);
                }
            }
        }

        res.status(200).send({ data: historias_vigentes_ });
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
}

const obtener_historia_img = async function (req, res) {
    var img = req.params['img'];
    fs.stat('./uploads/stories/' + img, function (err) {
        if (err) {
            res.status(200).send({ message: 'No se encontró la imagen' });
        } else {
            let path_img = './uploads/stories/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}


module.exports = {
    createStory,
    obtener_historias_usuario,
    obtener_historia_img
}