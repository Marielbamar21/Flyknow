const mongoose = require ('mongoose')

const questionSchema  = new mongoose.Schema({
    question: String,
    unit: String,
    correct: { type: Boolean, default: false },
    points: Number,
    answers: Array,
    status: { type: Boolean, default: true }
  },{ collection: 'question' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;