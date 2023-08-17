require('dotenv').config();

module.exports.config = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    mongo_bdname: process.env.MONGO_DBNAME,
}