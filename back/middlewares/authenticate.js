'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mauribravo';

exports.auth = function(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({message: 'no headers error 1'});
    }
    

    var token = req.headers.authorization.replace(/['"]+/g,'');
    var segment = token.split('.');

    next();

    if(segment.length != 3){
        return res.status(403).send({message: 'invalid token distinto a 3'});
    }else{
        try {
            var payload = jwt.decode(token,secret);
           
            if (payload.exp<=moment().unix()){
                return res.status(403).send({message: 'token expirado'});
            }

        } catch (error) {
            return res.status(403).send({message: 'invalid token try catch'});
        }
    }

    req.user = payload;



    next();

}

//escribir el auth
//implementarlo
//pero el clientecontroller.js en funcion : 
// const listar_clientes_filtro_admin 
// no le llega el usuario entonces no puede saber si es o no es admin en su rol
// hay que verificar el rol desde otro lado