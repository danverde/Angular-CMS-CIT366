const mongoose = require('mongoose'),
  Schema = moongose.Schema;
  
var documentSchema = new Schema({
   id: {type: String, required: true},
   name: {type: String, required: true},
   url: {type: String, required: true},
   children: {type: Array},
   description: {type: String},
});

module.exports = mongoose.model('Document', documentSchema);