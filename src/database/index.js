const { MongoClient } = require('mongodb');
const debug = require('debug')('app:config');
const {config} = require('../config')

process.env.DEBUG = 'app:config';
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
})