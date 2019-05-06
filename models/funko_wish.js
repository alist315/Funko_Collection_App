const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  name:{type: String, required: true},
  numberInCollection:{type: Number, minValue: 0},
  popType:{type: String, required:true},
  img:{type: String, required: true},
  value:{type:Number, minValue: 0},
  collection_:{type:String, required: true},
});

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;
