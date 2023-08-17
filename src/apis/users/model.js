const mongoose = require ('mongoose')

const userSchema  = new mongoose.Schema({
    name: String,
    lastname: String,
    acumpoints:{ type: Number, default: 0 },
    units: Array,
    questions: Array,
    status: { type: Boolean, default: true }
  },{ collection: 'user' });

const User = mongoose.model('User', userSchema);

module.exports = User;