var Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('../helpers/jwt');
const { uniqueUsernameGenerator } = require("unique-username-generator");

const create_usuario = async function (req, res) {
    console.log(req.body);
    let data = req.body;

    let usuarios = await Usuario.find({ email: data.email });

    if (usuarios.length == 0) {
        let usersnames = [];
        usersnames.push(data.nombres + '' + data.apellidos);

        const config = {
            dictionaries: [usersnames],
            separator: '',
            style: 'capital',
            randomDigits: 3
        }

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(data.password, salt, async function (err, hash) {
                // Store hash in your password DB.
                data.password = hash;
                data.username = '@' + uniqueUsernameGenerator(config);
                let usuario = await Usuario.create(data);
                res.status(200).send({ data: usuario });
            });
        });
    } else {
        res.status(200).send({ data: undefined, message: 'El correo electrónico ya existe' });
    }
}

const login_usuario = async function (req, res) {
    console.log(req.body);
    let data = req.body;

    let usuario = await Usuario.find({ email: data.email });

    if (usuario.length >= 1) {
        //correo existe
        bcrypt.compare(data.password, usuario[0].password, function (err, result) {
            // result == true
            if (!err) {
                //
                if (result) {
                    res.status(200).send({
                        data: usuario[0],
                        token: jwt.createToken(usuario[0])
                    });
                } else {
                    res.status(200).send({ data: undefined, message: 'La contraseña es incorrecta' });
                }
            } else {
                res.status(200).send({ data: undefined, message: 'Ocurrió un problema' });
            }
        });
    } else {
        res.status(200).send({ data: undefined, message: 'El correo electrónico no existe' });
    }
}

const get_usuario = async function (req, res) {
    if (req.userr) {
        var id = req.params['id'];

        var usuario = await Usuario.findById({ _id: id });
        res.status(200).send({ data: usuario });
    } else {
        res.status(403).send({ message: 'NoAccess' });

    }
}

const update_usuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        var data = req.body;


        var usuario = await Usuario.findByIdAndUpdate({ _id: id }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            genero: data.genero,
            nacimiento: data.nacimiento,
            profesion: data.profesion,
            telefono: data.telefono,
            descripcion: data.descripcion
        });

        res.status(200).send({ data: usuario });
    } else {
        res.status(403).send({ message: 'NoAccess' });

    }
}

module.exports = {
    create_usuario,
    login_usuario,
    get_usuario,
    update_usuario
}