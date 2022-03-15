 'use strict'
 //las rutas que controlan los metodos de controlador cliente

 var express = require('express');
 //declaramos o inicializamos el controlador de cliente en esta ruta
 var clienteController = require('../controllers/ClienteController');
 //creamos nuestra primera ruta que gestiona la funcion o metodo "registro_cliente" 
 //que es un método post
 var api = express.Router(); //incializa express en su metodo router
 var auth = require('../middlewares/authenticate');

 api.post('/registro_cliente', clienteController.registro_cliente); //variable api con metodo post y para ubicar un error 
 //llamamos de igual forma  registro_cliente , luego inicializamos el controlador
 //la url registro_cliente está vinculada a nuestra funcion registro, luego exportamos esta api.

api.post('/login_cliente', clienteController.login_cliente) //este enlace del api va a gestionar el metodo login_cliente
api.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth,clienteController.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin',auth.auth,clienteController.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id',auth.auth,clienteController.obtener_cliente_admin); 
api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id',auth.auth,clienteController.eliminar_cliente_admin);
api.get('/obtener_cliente_guest/:id',auth.auth,clienteController.obtener_cliente_guest);

  //ya tenemos inicializada nuestra ruta y nuestro controlador de cliente
  module.exports = api; 
  