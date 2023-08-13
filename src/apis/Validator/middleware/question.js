
const {check, validationResult, query, body} = require('express-validator');
const debug = require('debug')('app:Validationquestion')
process.env.DEBUG = 'app:Validationquestion';
module.exports.ValidationsQuestion = {
    validationCreate: async(req,res,next) => 
    {
        try{
            await check('question').notEmpty().run(req);
            await check('unit').notEmpty().run(req);
            await check('correct').notEmpty().run(req);
            await check('points').notEmpty().isInt().run(req);
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {                
                    return res.status(400).json({errors: errors.array()})
                }
            else
                {
                    debug('paso')
                    return next();
                }
            }
            
        catch(error)
            {

            return res.status(400).json('No se pudo validar los datos')

            }
    }
}