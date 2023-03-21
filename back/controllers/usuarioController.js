var Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const create_usuario = async function(req,res){
    console.log(req.body);
    let data = req.body;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password, salt, async function(err, hash) {
           console.log(hash);
            // Store hash in your password DB.
            data.password = hash;
            let usuario = await Usuario.create(data);
            res.status(200).send({data:usuario});
        });
    });

    
}

module.exports = {
    create_usuario
}