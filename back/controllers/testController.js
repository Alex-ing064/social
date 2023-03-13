const test_api = async function(req,res){
    res.status(200).send({message:'Hola'});
}

module.exports = {
    test_api
}