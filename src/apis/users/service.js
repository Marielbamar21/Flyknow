const mongoose = require('mongoose')
const { Database } = require('../../database');
const { request } = require('express');
const User = require('./model');
const debug = require('debug')('app:UserService')
process.env.DEBUG = 'app:UserService';

const COLLECTION = 'user';

const Allget = async() => { 
    try {
        await Database()
        const users = await User.find({status: true});
        mongoose.connection.close();
        return users;
        } 
    catch (error) {
        debug('Error al obtener las unidades:', error);
        }
}

const getOne = async(id) => {
    try{
        await Database();
        const user= await User.findOne({_id:id , status:true})
        mongoose.connection.close();
        return user;


    }
    catch(error){
        debug('Error al obtener la unidad', error)
    }
}

const create = async(user) => {
    
    try {
        await Database();
        const newUser = new User(user);
        debug(newUser);
        let createUser = await newUser.save();
        mongoose.connection.close();
        return createUser;
    }
    catch(error){
        debug('Error al crear Unidad', error)
    }
}

const deleteOne = async(id) => {
    
    try {
        await Database();
        const deleteUser = await User.findByIdAndUpdate(id,{status: false})
        mongoose.connection.close();
        return deleteUser
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }
};
const update = async(id, user) => {
    
    try {
        await Database();
        const updateUser = await User.findByIdAndUpdate(id,user)
        mongoose.connection.close();
        return updateUser
    }
    catch(error){
        debug('error al eliminar unidad', error)
    }

}

module.exports.UserService = {
    Allget,
    getOne,
    create,
    deleteOne,
    update
}

