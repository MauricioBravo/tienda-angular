'use strict'

var mongoose =  require('mongoose' ); //var mongoose hace peticion a nuestro paquete mongoose 
var Schema = mongoose.Schema; //mongoose palabra reservada schema para inicializar el esquema

var AdminSchema = Schema({
    nombres : {type : String,required: true },  
    apellidos : {type : String,required: true },  
    email : {type : String,required: true },       
    password : {type : String,required: true },
    telefono : {type : String,required: true }, // usamos string porque no realizamos calculos y es practico por el +
    rol : {type : String,required: true },
    dni : {type : String,required: true},
})

//una vez inicializado debemos exportar el modulo
module.exports = mongoose.model ('admin', AdminSchema ); //recibe model del eschema, y el esquema