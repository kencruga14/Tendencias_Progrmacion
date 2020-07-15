;
'use strict'

const env = require('dotenv').config(),
    app = require('./app'),
    port = process.env.PORT || 3500;



app.listen(port, (err) => {
    if(!err){
        console.log(`El servidor esta funcionando en http://localhost:${port}`);
    }else{
        console.log('El servidor no esta funcionando');
    }
})
