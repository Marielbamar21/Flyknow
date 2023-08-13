const {check, validationResult, query, body} = require('express-validator');
const debug = require('debug')('app:AllValidations')
process.env.DEBUG = 'app:AllValidations';

module.exports.AllValidations = {
validationId:  async(req,res,next) => 
{
    try{
        await query('id').notEmpty().run(req);
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
        return res.status(400).json('No se pudo validar los datos');
    }

},
validationUpdate : async(req,res,next) => 
    {
        try{
            await query('id').notEmpty().run(req);
            await body().notEmpty().run(req);

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
            return res.status(400).json('No se pudo validar los datos');
        }

}
}