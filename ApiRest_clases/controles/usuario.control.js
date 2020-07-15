;
'use strict'

const connectDb = require('../config/db'),
    { ObjectID} = require('mongodb')

let prueba = (req, res) =>{
    res.status(200).send('Hola mundo servidor API')
    
}

let obtenerUsuarios = async(req, res) => {
    let db = await connectDb()
    let usuarios = []
    usuarios = await db.collection('usuarios').find().toArray()
    console.log(usuarios);
    if(usuarios.length > 0){
        res.status(200).json({
            transaccion: true,
            data: usuarios,
            msg: 'OK',
            token:''
        })
    }else{
        res.status(400).json({
            transaccion: false,
            data: null,
            msg: 'No existen usuarios',
            token: ''
        })
    }
}


let obtenerUsuario = async(req, res) => {
    let id = req.params.id
    let db = await connectDb()
    db.collection('usuarios').findOne({_id: ObjectID(id)})
    .then(data => {
        res.status(200).json({
            transaccion: true,
            data: data,
            msg: 'OK',
            token:''
        })
    }).catch(err => {
        res.status(400).json({
            transaccion: false,
            data: null,
            msg: 'No existen usuarios',
            token: ''
    })
})
}


let obtenerUsr = async(req, res) => {
    let id = req.query.id
    let db, usuario = null
    try{
        db = await connectDb()
        usuario = await db.collection('usuarios').findOne({_id: ObjectID(id)})
        res.status(200).json({
            transaccion: true,
            data: usuario,
            msg: 'OK',
            token:''
        })
    }catch (error) {
        console.log(error)
        res.status(400).json({
            transaccion: false,
            data: null,
            msg: 'No existen usuarios',
            token: ''
    })
}
}



module.exports = {
    prueba,
    obtenerUsuarios,
    obtenerUsuario,
    obtenerUsr
}