'use strict'

//importamos nuestro modelo de producto
 var Producto = require('../models/producto');
 const registro_producto_admin = async function(req,res){
    //validamos que req . user tenga la cabecera, que la peticion me mande el usuario para que tenga los permisos
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
            console.log(req.files  );
        }else{
            es.status(500).send({message: 'no access'});
        }
    }else{
        es.status(500).send({message: 'no access'});
    }
}
 module.exports={ //exporto mi primer metodo
    registro_producto_admin
 }     