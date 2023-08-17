const {QuestionService} = require('./service');
const {Validations} = require('../Validator/Validations');
const debug = require('debug')('app:QuestionController');
process.env.DEBUG = 'app:QuestionController';


module.exports.QuestionController = {


    getQuestions: async(req,res)=>{
        try{
            
            let questions = await QuestionService.Allget();
            res.json(questions);

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    getQuestion: async(req,res) => {   
        try{
        let {query : {id}} = req
        
        let question = await QuestionService.getOne(id);
        debug(question)
        if(!question)
        {
            res.json({message: 'El usuario no existe'})
        }
        else{
        res.status(200).json({message : 'Operacion Exitosa',
                                body : question});
            }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})
        }
    },
    createQuestions:async(req,res) => {
        try{
            let {body} =req
            let unit = await Validations.checkUnit(body.unit);
            if(!unit)
            {
                res.status(400).json('Unidad no encontrada')
            }
            else
            {
                let a = await QuestionService.create(body);
                debug(a)
                res.status(201).json({message: 'Operacion Exitosa',
                                        body: body});
            }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },

    deleteQuestion:async(req,res) => {
        try{
        let {query : {id}} = req
        let question = await QuestionService.getOne(id);
        
        if(!question){
            res.json({message:'El usuario no exite no se puede eliminar'})
        }
        else
        {
            let answers = question.answers
            debug(answers)
            if(answers.length == 0)
            {
                let questiono = await QuestionService.deleteOne(id);
                res.status(200).json({message : 'Operacion Exitosa',
                                        body : questiono});
            }
            else
            {
                res.status(400).json('No se puede eliminar esta pregunta ya que posee respuestas asociadas')
                debug(answers);
            }
        
        }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },
    updateQuestion:async(req,res) => {
        try{
        let {body} = req;
        let {query: {id}} = req;
        debug(id)
        let question = await QuestionService.getOne(id);
        
        if(!question){
            res.json({message:'El usuario no exite no se puede actualizar'})
        }
        else{
        let questiono = await QuestionService.update(id,{ $set:body });
        res.status(200).json({message : 'Operacion Exitosa',
                                body : questiono});
            }

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})
        }
    },
    createAnswers: async (req, res) => {
        try {
            let { body } = req;
            let a = body.idQuestion;
            let question = await QuestionService.getOne(a);
            debug(question)
    
            if (!question) {
                res.status(400).json({ message: 'Pregunta No encontrada' });
            } 
            else {
                let answers = question.answers;
                debug(answers)
                answers.push(body);
    
                let update = { $set: { answers: answers } };

                await QuestionService.update(a, update);
                res.status(201).json({ message: 'Operacion Exitosa', body: body });
            }
        } 
        catch (error) {
            debug(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAnswers: async(req,res)=>{
        try{
            let {query : {id}} = req;
            
            let question = await QuestionService.getOne(id);
            let answersArray = question.answers

            res.json(answersArray);

        }
        catch(error){
        debug(error);
        res.status(500).json({message: 'Internal server error'})

        }
    },


}
