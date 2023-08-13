const {check, validationResult, query, body} = require('express-validator');
const debug = require('debug')('app:Validationuser')
process.env.DEBUG = 'app:Validationuser';
module.exports.ValidationsUser = {
    validationCreate: async(req,res,next) => 
    {
        try{
            await check('name').notEmpty().run(req);
            await check('lastname').notEmpty().run(req);
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
    },
    validationAcum: async(req,res,next) => 
    {
        try{
            await query('id').notEmpty().run(req);
            await check('points').notEmpty().run(req);
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