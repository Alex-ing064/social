const test_api = async function(req,res){
    res.status(200).send({message:'hola'});
}

module.exports = {
    test_api
}