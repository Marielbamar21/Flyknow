const { ObjectId } = require('mongodb');
const { Database } = require('../../database');

const COLLECTION = 'unit';

const Allget = async() => {

    const collection = await Database(COLLECTION);
    return await collection.find({status: true}).toArray();

}


const getOne = async(id) => {

    const collection = await Database(COLLECTION);
    return await collection.findOne({_id: new ObjectId(id), status : true});

}


const getOneForName = async(name) => {

    const collection = await Database(COLLECTION)
    return await collection.findOne({name: name, status : true})

}

const create = async(unit) => {
    
    const newUnit = { ...unit,finished: false, status: true };
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(newUnit);
    return result.insertedId;

}

const deleteOne = async(id) => {
    
    const collection = await Database(COLLECTION);
    return await collection.updateOne({_id: new ObjectId(id)},{ $set: { status: false } });

};


const update = async(id, unit) => {
    
    const collection = await Database(COLLECTION);
    await collection.updateOne({_id: new ObjectId(id)},unit);
    let prod = await getOne(id);
    return prod;

}


module.exports.UnitService = {
    Allget,
    getOne,
    getOneForName,
    create,
    deleteOne,
    update
}

