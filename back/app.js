//entrar al back con consola "bash"
//npm start
//ng serve -o  en admin o la pag que quiero ver 
//brew services start mongodb-community@5.0 no necesario siempre
'use strict'

var express = require('express');
var app = express(); //inicializamos modulo express o framework creando la variable app 
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
// declaramos y obtenemos el cliente de la ruta
//
var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');

mongoose.connect('mongodb://127.0.0.1:27017/tienda',{useUnifiedTopology: true ,useNewUrlParser: true},(err, res)=>{
    if(err){
        console.log(err);
        console.log("está fallando algo en db");
    }
    else{
        app.listen(port,function(){
            console.log('servidor corriendo uwu p: '+port);
        }); //metodo listen para poner a la escucha nuestro sv
    }
})

//Qué es la librería body-parser de npm?
//Usualmente el cuerpo de una peticion (payload), contiene información desde una petición 
//tipo POST cuando un cliente desea crear una nueva entidad/registro o actualizar uno existente 
//mediante PUT. Los desarrolladores quienes implementan servidores, requieren frecuentemente
// accesar a la información del cuerpo de dicha petición.
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit : '50mb',extended:true}))

// esto es porque el back y front estan en droplets distintos
//entonces el back esta en el port 4201 y front en otro por lo que debemos
//enviar data entre servidores otortgando permisos con este siguiente texto
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});
//colocamos en uso las rutas para nuestro app
app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);

module.exports = app ;  //exporta modulo  (app inicializador de paquete express ( framework )  )