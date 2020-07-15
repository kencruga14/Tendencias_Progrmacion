;
'use strict'

const express = require('express');
      usuariosControl = require('../controles/usuario.control');

let api = express.Router();

//ENDPOINT

api.get('/prueba', usuariosControl.prueba);
api.get('/obtenerusuarios', usuariosControl.obtenerUsuarios);   // Sin parametros
api.get('/obtenerusuario/:id', usuariosControl.obtenerUsuario);  // params
api.get('/obtenerusr', usuariosControl.obtenerUsr);  //query


module.exports = api;