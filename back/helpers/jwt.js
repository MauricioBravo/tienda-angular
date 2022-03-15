'use strict'

var jwt = require('jwt-simple'); //para decodificar los tokens
var moment = require('moment'); 
var secret = 'mauribravo'; //contraseña para generar tokens y contrsaseña para encriptar los datos

exports.createToken = function(user){
    var payload ={
        sub:user._id, //sub con el codigo principal de esta coleccion o doc
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iar: moment().unix(),//la fecha en la que se crea el token, formato unix
        exp: moment().add(7,'days').unix()//fecha de expiracion del token
    
    }
    return jwt.encode(payload,secret);
}
