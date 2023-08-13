const express = require('express')
const {UnitController} = require('./controller')
const {ValidationUnit}= require('../Validator/middleware/unit')
const {AllValidations} = require('../Validator/middleware/allvalidation')
const router = express.Router();

module.exports.UnitAPI = (app) => {
    router
        .get('/AllUnits', UnitController.getUnits)
        .get('/show',AllValidations.validationId, UnitController.getUnit)
        .post('/NewUnit',ValidationUnit.validationCreate,UnitController.createUnit)
        .delete('/DeleteUnit',AllValidations.validationId,UnitController.deleteUnit)
        .put('/UpdateUnit',AllValidations.validationUpdate,UnitController.updateUnit)
    app.use('/api/unit',router);
    
}