const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var documentSchema = new Schema({
   id: {type: String, required: true},
   name: {type: String, required: true},
   url: {type: String, required: true},
   description: {type: String},
});

module.exports = mongoose.model('Document', documentSchema);