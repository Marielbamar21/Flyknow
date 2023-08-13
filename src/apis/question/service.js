const { ObjectId } = require('mongodb');
const { Database } = require('../../database');
const debug = require('debug')('app:QuestionService')
process.env.DEBUG = 'app:QuestionService';

const COLLECTION = 'question';

const Allget = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({status: true}).toArray();
}

const getOne = async(id) => {
    const collection = await Database(COLLECTION)
    return await collection.findOne({_id: new ObjectId(id), status : true})
}
const getForUnit= async(nameUnit) =>{
    const collection = await Database(COLLECTION)
    return await collection.find({unit:nameUnit, status: true}).toArray();

}

const create = async(question) => {
    
    const newQuestion = { ...question,anwers: [], status: true }
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(newQuestion);
    return result.insertedId;

}

const deleteOne = async(id) => {
    let ident= id.trim();
    const collection = await Database(COLLECTION);
    return await collection.updateOne({_id: new ObjectId(ident)},{ $set: { status: false } });
};

const update = async(id, question) => {
    
    const collection = await Database(COLLECTION);
    await collection.updateOne({_id: new ObjectId(id)},question);
    return await getOne(id);

}

module.exports.QuestionService = {
    Allget,
    getOne,
    getForUnit,
    create,
    deleteOne,
    update
}

