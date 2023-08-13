
const {check, validationResult, query, body} = require('express-validator');
const debug = require('debug')('app: ValidationUnit')

process.env.DEBUG='app: ValidationUnit';

module.exports.ValidationUnit = {
    validationCreate: async(req,res,next) => 
    {
        try{
            await check('name').notEmpty().run(req);
            await check('description').notEmpty().run(req);
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