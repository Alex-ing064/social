var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(30,'day').unix(),
    }

    return jwt.encode(payload,secret);
}