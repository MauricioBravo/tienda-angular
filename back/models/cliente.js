'use strict'

var mongoose =  require('mongoose' ); //var mongoose hace peticion a nuestro paquete mongoose 
var Schema = mongoose.Schema; //mongoose palabra reservada schema para inicializar el esquema

var ClienteSchema = Schema({
    nombres : {type : String,required: true },
    apellidos : {type : String,required: true },
    pais : {type : String,required: false },
    email : {type : String,required: true },
    password : {type : String,required: true },
    perfil : {type : String, default : 'perfil.png',required:true },
    telefono : {type : String,required: false }, // usamos string porque no realizamos calculos y es practico por el + 
    genero : {type : String,required: false },
    f_nacimiento : {type : String,required: false },
    dni : {type : String,required: false},

    createdAt:{type:Date, default: Date.now, require:true}
})

//una vez inicializado debemos exportar el modulo
module.exports = mongoose.model ('cliente', ClienteSchema ); //recibe model del eschema, y el esquema