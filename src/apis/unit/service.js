const mongoose = require('mongoose')
const { Database } = require('../../database');
const Unit = require('./model')
const debug = require('debug')('app:UnitService');
process.env.DEBUG = 'app:UnitService';

const  Allget = async() => {
    try {
        await Database()
        const units = await Unit.find({status: true});
        mongoose.connection.close();
        return units;
        } 
    catch (error) {
        debug('Error al obtener las unidades:', error);
        }
}


const getOne = async(id) => {
    try{
        await Database();
        const unit= await Unit.findOne({_id:id , status:true})
        mongoose.connection.close();
        return unit;


    }
    catch(error){
        debug('Error al obtener la unidad', error)
    }

}


const create = async(unit) => {
    try {
        await Database();
        const newUnit = new Unit(unit);
        debug(newUnit);
        let createUnit = await newUnit.save();
        mongoose.connection.close();
        return createUnit;
         
    }
    catch(error){
    debug('Error al crear Unidad', error)
    }
}

const deleteOne = async(id) => {
    try {
        await Database();
        const deleteUnit = await Unit.findByIdAndUpdate(id,{status: false})
        mongoose.connection.close();
        return deleteUnit
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }

};


const update = async(id, unit) => {
    try {
        await Database();
        const updateUnit = await Unit.findByIdAndUpdate(id,unit)
        mongoose.connection.close();
        return updateUnit
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }


}


module.exports.UnitService = {
    Allget,
    getOne,
    create,
    deleteOne,
    update
}

