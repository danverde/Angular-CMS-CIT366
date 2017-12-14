const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var contactSchema = new Schema({
   id: {type: String, required: true},
   name: {type: String, required: true},
   email: {type: String, required: true},
   phone: {type: String},
   imageUrl: {type: String},
   group: {type: Array},
});

module.exports = mongoose.model('Contact', contactSchema);