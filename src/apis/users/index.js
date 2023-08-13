const express = require('express')
const {UserController} = require('./controller')
const {ValidationsUser} = require('../Validator/middleware/users');
const {AllValidations} = require('../Validator/middleware/allvalidation')
const router = express.Router();

module.exports.UserAPI = (app) => {
    router
        .get('/AllUser',UserController.getUsers)
        .get('/show',AllValidations.validationId, UserController.getUser)
        .post('/NewUser',ValidationsUser.validationCreate,UserController.createUser)
        .delete('/DeleteUser',AllValidations.validationId,UserController.deleteUser)
        .put('/UpdateUser',AllValidations.validationUpdate,UserController.updateUser)

        .put('/AcumPoints',ValidationsUser.validationAcum, UserController.acumPoints)
    app.use('/api/user',router);
    
}