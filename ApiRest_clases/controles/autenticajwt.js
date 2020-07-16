;
'use strict'

const jwt = require('jsonwebtoken')
let autentica = (req, res, next) => {
    let token = req.headers.authorization || null
    console.log(token)
    jwt.verify(token, req.sessionID, (err, decode) => {
        if(err) {
            return res.status(400).json({
                transaccion: false,
                data: null,
                msg: 'Token invalido',
                token: null
            })
        } else {
            req.decode = decode
            let token = jwt.sign({data: decode.data}, req.sessionID, {
                algorithm: 'H256',
                expiresIn: 120 
            })   
            req.token = token
            next()
        }
    }) 
}
