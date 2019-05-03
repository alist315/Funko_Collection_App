const mongoose = require('mongoose');

const funkoSchema = new mongoose.Schema({
  name:{type: String, required: true},
  numberInCollection:{type: Number, minValue: 0},
  popType:{type: String, required:true},
  img:{type: String, required: true},
  value:{type:Number, minValue: 0},
  collection_:{type:String, required: true},
  qty:{type:Number, minValue: 0},
});

const Funko = mongoose.model('Funko', funkoSchema);

module.exports = Funko;
