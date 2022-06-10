'use strict'

var mongoose =  require('mongoose' ); //var mongoose hace peticion a nuestro paquete mongoose 
var Schema = mongoose.Schema; //mongoose palabra reservada schema para inicializar el esquema

var ProductoSchema = Schema({
    titulo  : {type : String,required: true },
    slug  : {type : String,required: true },
    galeria:[{type: Object, required: false}],
    portada  : {type : String,required: true },
    precio  : {type : Number,required: true },
    descripcion  : {type : String,required: true },
    contenido  : {type : String,required: true },
    stock  : {type : Number,required: true },
    nventas  : {type : Number,default : 0, required: true },
    npuntos : {type : Number,default : 0, required: true },
    categoria  : {type : Number, required: true },
    estado  : {type : String,default: 'Edicion', required: true },
    createdAt:{type:Date, default: Date.now, require:true}
})

//una vez inicializado debemos exportar el modulo
module.exports = mongoose.model ('producto', ProductoSchema ); //recibe model del eschema, y el esquema