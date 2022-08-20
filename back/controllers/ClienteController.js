"use strict";

//const { discriminator } = require("../models/cliente");
var Cliente = require("../models/cliente"); //nuestro modelo cliente va a estar incializado en la variable cliente
//en el cuerpo de este controlador están las funciones
//como registro login o verif de token , ej : registro_cliente
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function (req, res) {
    //metodo api

    var data = req.body; //variable que recibe toda la data por metodo post y guarda en data
    var clientes_arr = [];
    clientes_arr = await Cliente.find({ email: data.email });

    if (clientes_arr.length == 0) { //si el largo del mail es cero no existe por lo que lo registra
        //REGISTRO
        if (data.password) {//si hay contraseña ingresada
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) { //si hay un hash, osea contraseña fue encriptada
                    //console.log(hash); //mostrar hash (contraseña encriptada)
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({ data: reg }); //al ingresar a este metodo imprime el mensaje en postman

                } else {
                    res.status(200).send({ message: 'Error Server Contraseña', data: undefined });
                }
            }) //esta funcion va a ver si hay un error o la contraseña encriptada 
        } else {
            res.status(200).send({ message: 'No hay contra seña', data: undefined }); //al ingresar a este metodo imprime el mensaje en postman
        }
        //
        //console.log(reg);
    } else { //
        res.status(200).send({ message: 'el correo ya existe', data: undefined }); //al ingresar a este metodo imprime el mensaje en postman
    }


}

const login_cliente = async function (req, res) {
    var data = req.body;
    var cliente_arr = [];
    cliente_arr = await Cliente.find({email:data.email }); //guarda en email la data del body req

    if (cliente_arr.length == 0) { //no hay ningun user registrado
        res.status(200).send({ message: 'No se encontró el correo', data: undefined })
    } else {//vamos a logearnos porque hay usuario
        //LOGIN
        let user = cliente_arr[0];

        bcrypt.compare(data.password, user.password, async function(error,check){//check es falso si las pass no coinciden, true si si
            if(check){ //si es true el check (contraseñas coinciden)

                res.status(200).send({
                    data:user,
                    token:jwt.createToken(user)
                });

            }else{
                res.status(200).send({message:'Contraseña incorrecta',data: undefined});
            }
        });
    }

}

const listar_clientes_filtro_admin = async function (req,res){

    let tipo = req.params['tipo']; //arrays de parametros por ruta
    let filtro = req.params['filtro'];

    if(tipo == null || tipo == 'null'){
        let reg = await Cliente.find();
        res.status(200).send({data:reg});
    }else{
        if(tipo == 'apellidos'){
        let reg = await Cliente.find({apellidos: new RegExp(filtro,'i')});
        res.status(200).send({data:reg});

        }else if(tipo == 'correo'){
            let reg = await Cliente.find({email: new RegExp(filtro,'i')});
            res.status(200).send({data:reg});
        }
    }
}
    
    // if(tipo == null || tipo == 'null'){
    //     let reg = await Cliente.find();
    //     res.status(200).send({data:reg});
    // }else{
    //     



/*
console.log(req.user);
    if (req.user) {
        if (req.user.role == 'admin') {
            
            let tipo = req.params['tipo'];
            let filtro=req.params['filtro'];
            console.log(tipo);
            if(tipo == null || tipo == 'null'){
                let reg = await Cliente.find();
                 res.status(200).send({data:reg});

            
            }
        }else{
            res.status(500).send({message: 'no access'});
        }
    }else{
        res.status(500).send({message: 'no access 2'});
    }
*/



const registro_cliente_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin') {
            var data = req.body;

            bcrypt.hash('123456789',null,null,async function(err,hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg}); 
                }else{
                    res.status(200).send({ message: 'hubo error en el sv', data: undefined });
                }
            })
        }else{
            res.status(500).send({message: 'no access'});
        }
    }else{
        res.status(500).send({message: 'no access'});
    }
    

}

const obtener_cliente_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin') {

            var id = req.params['id'];
            //devuelvo el registro id a mi front 
            try {
                var reg = await Cliente.findById({_id:id});

                res.status(200).send({data:reg});
            } catch (error) {
                res.status(200).send({data:undefined});
            }
           
        }else{
            res.status(500).send({message: 'no access'});
        }
    }else{
        res.status(500).send({message: 'no access'});
    }
}

const actualizar_cliente_admin = async function(req,res){
    if(req.user){
        if (req.user.role == 'admin') {

            var id = req.params['id'];
            var data = req.body;
            //devuelvo el registro id a mi front 
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres:data.nombres,
                apellidos:data.apellidos,
                email:data.email,
                telefono:data.telefono,
                f_nacimiento:data.f_nacimiento, 
                dni:data.dni,
                genero:data.genero,
            })
            res.status(200).send({data:reg});
           
        }else{
            res.status(500).send({message: 'no access'});
        }
    }else{
        res.status(500).send({message: 'no access'});
    }
}

const eliminar_cliente_admin = async function  (req,res){
    if(req.user){
        if (req.user.role == 'admin') {

           var id = req.params['id'];
            let reg = await Cliente.findByIdAndRemove({_id : id});
            res.status(200).send({data:reg});


        }else{
            res.status(500).send({message: 'no access'});
        }
    }else{
        res.status(500).send({message: 'no access'});
    }
}

const obtener_cliente_guest = async function(req,res){
    if(req.user){
    
        var id = req.params['id'];
        //devuelvo el registro id a mi front 
        try {
            var reg = await Cliente.findById({_id:id});

            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined});
        }


    }else{
        res.status(500).send({message: 'no access'});
    }
}

module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente_guest
}