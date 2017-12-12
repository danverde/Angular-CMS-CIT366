const mongoose = require('mongoose'),
  Schema = moongose.Schema;

var contactSchema = new Schema({
   id: {type: String, required: true},
   name: {type: String, required: true},
   emil: {type: String, required: true},
   phone: {type: String},
   imageUrl: {type: String},
   group: {type: Array},
});

module.exports = mongoose.model('Contact', contactSchema);