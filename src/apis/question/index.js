const express = require('express')
const {QuestionController} = require('./controller')
const {ValidationsQuestion} = require('../Validator/middleware/question')
const {ValidationsAnswer} = require('../Validator/middleware/answer')
const {AllValidations}= require('../Validator/middleware/allvalidation')
const router = express.Router();

module.exports.QuestionAPI = (app) => {
    router
        .get('/AllQuestion', QuestionController.getQuestions)
        .get('/ShowQuestion',AllValidations.validationId, QuestionController.getQuestion)
        .post('/Newquestion',ValidationsQuestion.validationCreate,QuestionController.createQuestions)
        .delete('/DeleteQuestion',AllValidations.validationId,QuestionController.deleteQuestion)
        .put('/UpdateQuestion',AllValidations.validationUpdate,QuestionController.updateQuestion)

        .put('/NewAnswer',ValidationsAnswer.validationCreate , QuestionController.createAnswers)
        .get('/AllAnswers', AllValidations.validationId,QuestionController.getAnswers)
    app.use('/api/',router);


    
}