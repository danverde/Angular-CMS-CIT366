const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
var messageSchema = new Schema({
   id: {type: String, required: true},
   subject: {type: String},
   msgText: {type: String, required: true},
   sender: {type: String, required: true},
});

module.exports = mongoose.model('Message', messageSchema);