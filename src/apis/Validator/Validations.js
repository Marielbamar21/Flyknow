const {QuestionService} = require('../question/service');
const {UnitService} = require('../unit/service')
const debug = require('debug')('app:Validations');

process.env.DEBUG = 'app:Validations';

module.exports.Validations = {
    checkUnit: async(idUnit) =>{  
        try
        {
            debug(idUnit)
            let  unit= await UnitService.getOne(idUnit);
            debug(unit);
            return unit;
        }
        catch(error)
        {
            debug('Problemas al encontrar Unidad');
        }
    
    },
    checkQuestion: async(idUnit) =>{ 
        try{
            debug(idUnit)
            let question = await QuestionService.getForUnit(idUnit);
            debug(question)
            if(!question)
            {
                debug('No hay preguntas asociadas')
                return null
            }
            else{
                    debug( 'respuestas encontradas');
                    return question;
            }
        }
        catch(error){
            debug(`getForUnit${error}`);
    
        }
        },
    findQuest: async(idQuest) =>{
        try{
            debug(idQuest);
            let question = QuestionService.getOne(idQuest);
            if(!question)
            {
                
                debug('Problemas al encontrar la pregunta')
                return null;
            }
            else
            {
                return question;
            }
        }
        catch(error){
            debug(`error al buscar pregunta ${error}`)
        }
},


}