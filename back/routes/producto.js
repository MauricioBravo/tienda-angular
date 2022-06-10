'use strict'
//las rutas que controlan los metodos de controlador cliente

var express = require('express');
//declaramos o inicializamos el controlador de cliente en esta ruta
var productoController = require('../controllers/productoController');
//creamos nuestra primera ruta que gestiona la funcion o metodo "registro_cliente" 
//que es un método post
var api = express.Router(); //incializa express en su metodo router
var auth = require('../middlewares/authenticate');

api.post('/registro_producto_admin',auth.auth, productoController.registro_producto_admin);

 //ya tenemos inicializada nuestra ruta y nuestro controlador de cliente
 module.exports = api; 
 