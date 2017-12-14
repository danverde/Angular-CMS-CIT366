const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
   maxDocumentId: {type: 'String'},
   maxMessageId: {type: 'String'},
   maxContactId: {type: 'String'},
   maxContactsId: {type: 'String'}
});

module.exports = mongoose.model('Sequence', schema);