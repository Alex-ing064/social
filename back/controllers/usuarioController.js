var Usuario = require('../models/Usuario');
var Usuario_invitacion = require('../models/Usuario_invitacion');
var Usuario_amigo = require('../models/Usuario_amigo');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('../helpers/jwt');
const { uniqueUsernameGenerator  } = require("unique-username-generator");

var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');



const create_usuario = async function(req,res){
    console.log(req.body);
    let data = req.body;

    let usuarios = await Usuario.find({email:data.email});

    if(usuarios.length == 0){
        let usersnames = [];
        usersnames.push(data.nombres+''+data.apellidos);

        const config = {
            dictionaries: [usersnames],
            separator: '',
            style: 'capital',
            randomDigits: 3
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(data.password, salt, async function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;
                data.username = '@'+uniqueUsernameGenerator(config);
                let usuario = await Usuario.create(data);
                res.status(200).send({data:usuario});
            });
        });
    }else{
        res.status(200).send({data:undefined,message: 'El correo electrónico ya existe'});
    }
}

const login_usuario = async function(req,res){
    console.log(req.body);
    let data = req.body;

    let usuario = await Usuario.find({email:data.email});

    if(usuario.length >= 1){
        //correo existe
        bcrypt.compare(data.password, usuario[0].password, function(err, result) {
            // result == true
            if(!err){
                //
                if(result){
                    res.status(200).send({
                        data:usuario[0],
                        token: jwt.createToken(usuario[0])
                    });
                }else{
                    res.status(200).send({data:undefined,message: 'La contraseña es incorrecta'});
                }
            }else{
                res.status(200).send({data:undefined,message: 'Ocurrió un problema'});
            }
        });
    }else{
        res.status(200).send({data:undefined,message: 'El correo electrónico no existe'});
    }
}

const get_usuario = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        var usuario = await Usuario.findById({_id:id});
        res.status(200).send({data:usuario});
    }else{
        res.status(403).send({message: 'NoAccess'}); 
    }
}

const update_usuario = async function(req,res){
    if (req.user) {
        var id = req.params['id'];
        var data = req.body;


        var usuario = await Usuario.findByIdAndUpdate({_id:id},{
            nombres: data.nombres,
            apellidos: data.apellidos,
            genero: data.genero,
            nacimiento: data.nacimiento,
            profesion: data.profesion,
            telefono: data.telefono,
            descripcion: data.descripcion
        });

        res.status(200).send({data:usuario});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

const update_password = async function(req,res){
    if (req.user) {
        var id = req.params['id'];
        var data = req.body;

        var usuario = await Usuario.findById({_id:id});

        bcrypt.compare(data.password_actual, usuario.password, function(err, result) {
            if(!err){
                if(result){
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(data.password_nueva, salt, async function(err, hash) {
                            await Usuario.findByIdAndUpdate({_id:id},{
                                password: hash
                            });
                            res.status(200).send({data:usuario});
                        });
                    });
                }else{
                    res.status(200).send({data:undefined,message: 'La contraseña actual es incorrecta'});
                }
            }else{
                res.status(200).send({data:undefined,message: 'Ocurrió un problema'});
            }
        });

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

const validate_usuario = async function(req,res){
    var data = req.body;

    var usuarios = await Usuario.find({email:data.email});

    if(usuarios.length >= 1){

        let min = 1000;
        let max = 9999;

        let random = Math.floor(Math.random()*(max-min+1)+min);
        let usuario = await Usuario.findByIdAndUpdate({_id:usuarios[0]._id},{
            code_reset: random
        });

        email_code_reset(random,usuario.email);

        res.status(200).send({data:true});
    }else{
        res.status(200).send({data:false});
    }
}

const validate_code = async function(req,res){
    let code = req.params['code'];
    let email = req.params['email'];

    let usuario = await Usuario.findOne({email:email});

    if(code == usuario.code_reset){
        res.status(200).send({data:true});
    }else{
        res.status(200).send({data:false});
    }

}

const reset_password = async function(req,res){
    var email = req.params['email'];
    var data = req.body;

    var usuario = await Usuario.findOne({email:email});

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password_new, salt, async function(err, hash) {
            await Usuario.findByIdAndUpdate({_id:usuario._id},{
                password: hash
            });
            res.status(200).send({data:usuario});
        });
    });
}


/////INVITACIONES DE AMISTAD

const send_invitacion_amistad = async function(req,res){
    if (req.user) {
        let data = req.body;
        data.usuario_origen = req.user.sub;
        let invitacion = await Usuario_invitacion.create(data);
        res.status(200).send({data:invitacion});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

const get_usuario_random = async function(req,res){
    if (req.user) {
        let data = [];
        let usuarios = await Usuario.find({_id:{$ne:req.user.sub}});
        let invitaciones = await Usuario_invitacion.find({usuario_origen:req.user.sub});
        let count = 0;
        for(var item of usuarios){
            let reg = invitaciones.filter(subitem=> subitem.usuario_destinatario.toString() == item._id.toString());
            if(count <= 5){
                if(reg.length == 0){
                    count++;
                    data.push(item);
                }
            }
        }
        res.status(200).send({data:data});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


const get_invitaciones_usuario= async function(req,res){
    if (req.user) {
        let invitaciones = await Usuario_invitacion.find({usuario_destinatario:req.user.sub}).populate('usuario_origen');
        res.status(200).send({data:invitaciones});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

const aceptar_denegar_invitacion = async function(req,res){
    if (req.user) {
        let tipo = req.params['tipo'];//Denegar Aprobar 
        let id = req.params['id'];

        if(tipo === 'Denegar'){
            //ELIMINAR LA INVITACION
            await Usuario_invitacion.findOneAndRemove({_id:id});
            res.status(200).send({data:true});
        }else if(tipo === 'Aprobar'){
            //OBTENER LA INFORMACION DE LA INVITACIÓN
            let invitacion = await Usuario_invitacion.findById({_id:id});

            //CREAR LA RELACION DE AMIGO
            await Usuario_amigo.create({
                usuario_origen: req.user.sub,
                usuario_amigo: invitacion.usuario_origen
            });

            //ELIMINAR LA INVITACIÓN
            await Usuario_invitacion.findOneAndRemove({_id:id});
            res.status(200).send({data:true});
        }
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}






function email_code_reset(code,email){
    try {
        var readHTML = function(path,callback){
            fs.readFile(path,{encoding: 'utf-8'},function(err,html) {
                if(!err){
                    callback(null,html);
                }else{
                    console.log(err);
                }
            });
        }
    
        var transport = nodemailer.createTransport(smtp({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'diegoarca02@gmail.com',
                pass: 'ogfvvlxksebtrkfj'
            }
        }));
    
        readHTML(process.cwd()+'/emails/code-password.html', async (err,html)=>{
            console.log(err);
            let res_html = ejs.render(html,{code:code});
            var template = handlebars.compile(res_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: '"Red Social" <diegoarca02@gmail.com>',
                to: email,
                subject: 'Código de restablecimiento',
                html: htmlToSend
            };
    
            transport.sendMail(mailOptions, async function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log(info);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create_usuario,
    login_usuario,
    get_usuario,
    update_usuario,
    update_password,
    validate_usuario,
    validate_code,
    reset_password,

    send_invitacion_amistad,
    get_usuario_random,
    get_invitaciones_usuario,
    aceptar_denegar_invitacion
}