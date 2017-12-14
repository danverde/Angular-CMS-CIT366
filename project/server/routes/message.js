const express = require('express');
const router = express.Router();
const messageModel = require('../models/messages');
const sequenceGenerator = require('./sequenceGenerator');


function getMessages(request, response) {
  messageModel.find()
    .exec((err, messages) => {
      if (err) {
        return response.status(500).json({
          title: 'No Message Found',
          error: err
        });
      }
      response.status(200).json(messages);
    });
}

function saveMessage(response, message) {
  message.save((err, res) => {
    if (err) {
      return response.status(500).json({
        title: 'Could not save messages',
        error: {
          message: err
        }
      });
    } else {
      messageModel.find()
        .exec((err, msg) => {
          if (err) {
            return response.status(500).json({
              title: 'Unable to get message List',
              error: err
            });
          } else {
            response.status(200).json({
              message: 'Deleted Message',
              obj: msg
            });
          };
        });
    }
  });
};


router.get('/', function (req, res, next) {
  getMessages(req, res);
});

router.post('/', function (req, res, next) {
  var maxMessageId = sequenceGenerator.nextId('messages');
  var message = new messageModel({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  saveMessage(res, message);
});

module.exports = router;
