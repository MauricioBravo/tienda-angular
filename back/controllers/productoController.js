'use strict'

//importamos nuestro modelo de producto
 var Producto = require('../models/producto');
 const registro_producto_admin = async function(req,res){
    //validamos que req . user tenga la cabecera, que la peticion me mande el usuario para que tenga los permisos
    if(req.user){
        if(req.user.role == 'admin'){
            
        }
    }
}
 module.exports={
    registro_producto_admin
 }