const { ObjectId } = require('mongodb');
const { Database } = require('../../database');
const debug = require('debug')('app:UserService')
process.env.DEBUG = 'app:UserService';

const COLLECTION = 'user';

const Allget = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({status: true}).toArray();
}

const getOne = async(id) => {
    const collection = await Database(COLLECTION)
    return await collection.findOne({_id: new ObjectId(id), status : true})
}

const create = async(user,units,questions) => {
    
    const newUser = { ...user,acumpoints: 0, units: units,questions:questions, status: true }
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(newUser);
    return result.insertedId;

}

const deleteOne = async(id) => {
    
    const collection = await Database(COLLECTION);
    await collection.updateOne({_id: new ObjectId(id)},{ $set: { status: false } });
    let user= await getOne(id);
    return  user;
};
const update = async(id, user) => {
    
    const collection = await Database(COLLECTION);
    await collection.updateOne({_id: new ObjectId(id)},user);
    let prod = await getOne(id);
    return prod;

}

module.exports.UserService = {
    Allget,
    getOne,
    create,
    deleteOne,
    update
}

