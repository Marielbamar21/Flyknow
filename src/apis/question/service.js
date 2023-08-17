const mongoose = require('mongoose')
const { Database } = require('../../database');
const Question = require('./model');
const debug = require('debug')('app:QuestionService');
process.env.DEBUG = 'app:QuestionService';

const Allget = async() => {
    try {
        await Database()
        const question = await Question.find({status: true});
        mongoose.connection.close();
        return question;
        } 
    catch (error) {
        debug('Error al obtener las unidades:', error);
        }
}

const getOne = async(id) => {
    try{
        await Database();
        const question= await Question.findOne({_id:id , status:true})
        mongoose.connection.close();
        return question;

    }
    catch(error){
        debug('Error al obtener la unidad', error)
    }
}
const getForUnit= async(idUnit) =>{
    try{
    await Database();
    let question = await Question.findOne({unit : idUnit})
    mongoose.connection.close();
    return question
    }
    catch(error){
        debug(' no se pudo encontrar la pregunta')
    }

}

const create = async(question) => {
    try{
    await Database();
    const newQuestion = new Question(question);
    let createQuestion = await newQuestion.save();
    mongoose.connection.close();
    return createQuestion;    
    }
    catch(error){
        debug('Error al crear Unidad', error)
    }

}

const deleteOne = async(id) => {
    try {
        debug(id)
        await Database();
        const deleteQuestion = await Question.findByIdAndUpdate(id,{status: false})
        debug(deleteQuestion)
        mongoose.connection.close();
        return deleteQuestion
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }
};

const update = async(id, question) => {
    
    try {
        await Database();
        const updateQuestion = await Question.findByIdAndUpdate(id,question)
        mongoose.connection.close();
        return updateQuestion
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }

}

module.exports.QuestionService = {
    Allget,
    getOne,
    getForUnit,
    create,
    deleteOne,
    update
}

