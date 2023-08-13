const {UnitService} = require('./service');
const debug = require('debug')('app:UnitController');
const {query} = require('express');
const {Validations} = require('../Validator/Validations');

process.env.DEBUG = 'app:UnitController';


module.exports.UnitController = {


    getUnits: async(req,res)=>{
        try{
            
            let Units = await UnitService.Allget();
            res.json(Units);

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    getUnit: async(req,res) => {   
        try{
        let {query : {id}} = req
        let Unit = await UnitService.getOne(id);
        if(!Unit)
        {
            res.json({message: 'El usuario no existe'})
        }
        else{
            res.status(200).json({message : 'Operacion Exitosa',
                                body : Unit});
        }
        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})
    }
    },
    
    
    createUnit:async(req,res) => {
        try{
            let {body} =req
            await UnitService.create(body);
            res.status(201).json({message: 'Operacion Exitosa',
                                body: body});

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    deleteUnit:async(req,res) => {
        try{
        let {query : {id}} = req
        debug(id);
        let unit = await UnitService.getOne(id);
        debug(unit);
        
        if(!unit)
        {
            res.status(400).json({message:'El usuario no exite no se puede eliminar'})
        }
        else
        {
            debug(unit.name)
            let quest = await Validations.checkQuestion(unit.name)
            debug (quest.length)
            if(quest.length == 0)
            {
                let uniteDelete = await UnitService.deleteOne(id);
                res.status(200).json({message : 'Operacion Exitosa',
                                body : uniteDelete});
            }
            else
            {
                res.status(400).json('No se puede eliminar esta categoria ya que posee presuntas asociadas')
                debug(quest);
            }
        }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})
        }
    },

    updateUnit:async(req,res) => {
        try{
        let {body} = req;
        let {query : {id}} = req;
        let unit = await UnitService.getOne(id);
        
        if(!unit){
            res.json({message:'El usuario no exite no se puede actualizar'})
        }
        else
        {
            let unitUp = await UnitService.update(id,{ $set:body });
            res.status(200).json({message : 'Operacion Exitosa',
                                    body : unitUp});
        }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    }
}
