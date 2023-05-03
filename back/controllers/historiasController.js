var Historia = require('../models/Historia');

const createStory = async function(req,res){
    if (req.user) {
        
        //req.body
        //req.files
        let img_path = req.files.imagen.path.split('\\')[2];

        let exp = new Date();
        exp.setDate(exp.getDate()+1);

        let historia = await Historia.create({
            usuario: req.user.sub,
            imagen: img_path,
            exp: exp
        });
        
        res.status(200).send({data:historia});

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    createStory
}