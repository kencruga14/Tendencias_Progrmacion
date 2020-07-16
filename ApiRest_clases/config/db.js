;
'use strict'

const { MongoClient } = require('mongodb'),
{
    HOST_DB,
    PORT_DB,
    USER_DB,
    PASS_DB,
    NAME_DB 
} = process.env,
mongoUrl = "mongodb+srv://kencruga:esmeraldas14+@cluster0.p6w1s.mongodb.net/apirest?retryWrites=true&w=majority";


let connection

let connectDb = async() => {
    if (connection) return connection
    let cliente
    try {
        cliente = await MongoClient.connect(mongoUrl,{
            useUnifiedTopology: true,
            useNewUrlParser: true

        })
        connection = cliente.db(NAME_DB)
        console.log('Db conectada...')
    } catch (error){
        console.log(error)
        process.exit(1)
    }
    return connection
}

module.exports = connectDb