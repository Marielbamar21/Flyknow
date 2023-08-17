//const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const debug = require('debug')('app:config');
const {config} = require('../config')
process.env.DEBUG = 'app:config';

module.exports.Database = async()=>{
    try{
        if (mongoose.connection.readyState === 1) {
            debug('Ya estamos conectados a la base de datos');
            return Promise.resolve();
        }
        else {
            debug('Conexion exitosa')
            return mongoose.connect(config.mongo_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true 

                }).then(debug('Conectado')).catch((er)=>{debug('el error es',er)});
        }
    }
    catch(error){
        reject(error);
    }
}
/*
let connection = null;

module.exports.Database = (collection) => new Promise(async(resolve, reject)=>{

    try{ if(!connection){
        const client = new MongoClient(config.mongo_uri);
        connection = await client.connect();
        debug('Conexion exitosa con Mongodeb atlas');
    }
    debug('Reutilizando conexion')
    const db = connection.db(config.mongo_bdname);
    resolve(db.collection(collection))
    }catch(error){
        reject(error);
    }
})*/