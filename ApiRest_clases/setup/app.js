;
'use strict'

const express = require('express'),
      bodyParser = require('body-parser'),
      usuarioRutas = require('../rutas/usuario.rutas'),
      productosRutas = require('../rutas/producto.rutas'),
      passport = require('passport'),
      cors = require('cors'),
      parseurl = require('parseurl'),
      session = require('express-session')

let app = express();
let connectDb = require('../config/db')
let db = connectDb()
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'SessionID',
    cookie: { 
        httpOnly: false,
        maxAge: 60 * 10
    }
}
let optionCors ={
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors(optionCors))
//ession
app.use(session(sess))
//pasport
app.use(passport.initialize())
app.use(passport.session())
//Ejemplo de sesiones
app.use(function(req, res,next){
    if (!req.session.views) {
        req.session.views = {}
    }
    let pathname = parseurl(req).pathname
    req.session.views[pathname] = (req.session.views[pathname] || 0) +1
    next()
})

//rutas
app.get('/session1', function(req, res) {
    console.log(req.sessionID)
    res.send(`El numero de visitantes es: ${req.session.views['/session1']}`)
})

app.get('/session2', function(req, res) {
    console.log(req.sessionID)
    res.send(`El numero de visitantes es: ${req.session.views['/session2']}`)
})

app.use('/api', usuarioRutas);

module.exports = app