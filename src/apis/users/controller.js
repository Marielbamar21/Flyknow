const { UserService } = require('./service');
const { UnitService } = require('../unit/service');
const { QuestionService } = require('../question/service');
const debug = require('debug')('app:UserController');
const {query, request} = require('express');
const {Validations} = require('../Validator/Validations');

process.env.DEBUG = 'app:UserController';


module.exports.UserController = {


    getUsers: async(req,res)=>{
        try{
            
            let users = await UserService.Allget();
            res.json(users);

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    getUser: async(req,res) => {   
        try{
        let {query : {id}} = req
        let user = await UserService.getOne(id);
        if(!user)
        {
            res.json({message: 'El usuario no existe'})
        }
        else{
            res.status(200).json({message : 'Operacion Exitosa',
                                body : user});
        }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

    }
    },
    
    createUser:async(req,res) => {
        try{
            let {body} =req
            let units = await UnitService.Allget();
            let questions = await QuestionService.Allget();
            let id=await UserService.create(body,units,questions);
            let user= await UserService.getOne(id);
            res.status(201).json({message: 'Operacion Exitosa',
                                body: user});

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    deleteUser:async(req,res) => {
        try{
        let {query : {id}} = req
        let user = await UserService.getOne(id);
        
        if(!user)
        {
            res.json({message:'El usuario no exite no se puede eliminar'})
        }
        else
        {
            
            let us = await UserService.deleteOne(id);
            res.status(200).json({message : 'Operacion Exitosa',
                                body : us});
        }
        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})
        }
    },
    updateUser:async(req,res) => {
        try{
        let {body} = req;
        let {query : {id}} = req;
        let user = await UserService.getOne(id);
        
        if(!user){
            res.json({message:'El usuario no exite no se puede actualizar'})
        }
        else{
        let userUp = await UserService.update(id,{ $set:body });
        res.status(200).json({message : 'Operacion Exitosa',
                                body : userUp});
        }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },
    acumPoints: async(req,res)=> {
    try{
        let {query : {id}} = req
        let {body} = req;
        let user = await UserService.getOne(id)
        let acum = user.acumpoints + body.points
        let newUser = await UserService.update(id,{$set:{acumpoints : acum}});
        res.status(200).json({message : 'Operacion Exitosa', body : newUser})
        }
    catch(error)
    {
        
        res.status(500).json({message: 'Internal server error'})
    }
        


    }
}