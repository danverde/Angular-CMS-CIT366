const express = require('express');
const router = express.Router();
const contactModel = require('../models/contacts');
const sequenceGenerator = require('./sequenceGenerator');


function getContacts(request, response) {
  contactModel.find()
    .exec((err, contacts) => {
      if (err) {
        return response.status(500).json({
          title: 'No Contact Found',
          error: err
        });
      }
      response.status(200).json(contacts);
    });
}

function saveContact(response, contact) {
  contact.save((err, res) => {
    if (err) {
      return response.status(500).json({
        title: 'Could not save contacts',
        error: {
          contact: err
        }
      });
    } else {
      contactModel.find()
        .exec((err, contacts) => {
          if (err) {
            return response.status(500).json({
              title: 'Unable to get contact List',
              error: err
            });
          } else {
            response.status(200).json({
              message: 'Deleted Contact',
              obj: contacts
            });
          };
        });
    }
  });
};

function deleteContact(response, contact) {
  contactModel.remove({
    id: contact.id
  }, (err, result) => {
    if (err) {
      return response.status(500).json({
        title: 'An error occured',
        error: err
      });
    } else {
      contactModel.find()
        .exec((err, contacts) => {
          if (err) {
            return response.status(500).json({
              title: 'Unable to get contact List',
              error: err
            });
          } else {
            response.status(200).json({
              message: 'Deleted Contact',
              obj: contacts
            });
          }
        });
    }
  });
}


router.get('/', function (req, res, next) {
  getContacts(req, res);
});

router.post('/', function (req, res, next) {
  var maxContactId = sequenceGenerator.nextId('contacts');
  var contact = new contactModel({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  saveContact(res, contact);
});

router.patch('/:id', (req, res, next) => {
  contactModel.findOne({id: req.params.id}, (err, contact) => {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No Contact Found',
        error: {
          contact: 'Contact not found'
        }
      });
    } else {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      saveContact(res, contact);
    }
  });
});

router.delete('/:id', (req, res, next) => {
  var query = {
    id: req.params.id
  };

  contactModel.findOne(query, (err, contacts) => {
    if (err) {
      return res.status(500).json({
        title: 'No Contact Found',
        error: err
      });
    }
    if (!contacts) {
      return res.status(500).json({
        title: 'No Contact Found',
        error: {
          contactId: req.params.id
        }
      });
    }
    deleteContact(res, contacts);
  });
});

module.exports = router;
