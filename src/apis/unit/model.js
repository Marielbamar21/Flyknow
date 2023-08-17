const mongoose = require ('mongoose')

const unitSchema  = new mongoose.Schema({
    name: String,
    description: String,
    desblock: { type: Boolean, default: false },
    status: { type: Boolean, default: true }
  },{ collection: 'unit' });

const Unit = mongoose.model('unit', unitSchema);

module.exports = Unit;