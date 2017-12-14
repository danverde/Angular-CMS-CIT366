const express = require('express');
const router = express.Router();
const documentModel = require('../models/documents');
const sequenceGenerator = require('./sequenceGenerator');


function getDocuments(request, response) {
  documentModel.find()
    .exec((err, docs) => {
      if (err) {
        return response.status(500).json({
          title: 'No Document Found',
          error: err
        });
      }
      response.status(200).json(docs);
    });
}

function saveDocument(response, document) {
  document.save((err, res) => {
    if (err) {
      return response.status(500).json({
        title: 'Could not save documents',
        error: {
          document: err
        }
      });
    } else {
      documentModel.find()
        .exec((err, docs) => {
          if (err) {
            return response.status(500).json({
              title: 'Unable to get document List',
              error: err
            });
          } else {
            response.status(200).json({
              message: 'Deleted Document',
              obj: docs
            });
          };
        });
    }
  });
};

function deleteDocument(response, doc) {
  documentModel.remove({
    id: doc.id
  }, (err, result) => {
    if (err) {
      return response.status(500).json({
        title: 'An error occured',
        error: err
      });
    } else {
      documentModel.find()
        .exec((err, docs) => {
          if (err) {
            return response.status(500).json({
              title: 'Unable to get document List',
              error: err
            });
          } else {
            response.status(200).json({
              message: 'Deleted Document',
              obj: docs
            });
          }
        });
    }
  });
}


router.get('/', function (req, res, next) {
  getDocuments(req, res);
});

router.post('/', function (req, res, next) {
  var maxDocumentId = sequenceGenerator.nextId('documents');
  var document = new documentModel({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveDocument(res, document);
});

router.patch('/:id', (req, res, next) => {
  documentModel.findOne({id: req.params.id}, (err, doc) => {
    if (err || !doc) {
      return res.status(500).json({
        title: 'No Document Found',
        error: {
          document: 'Document not found'
        }
      });
    } else {
      doc.name = req.body.name;
      doc.description = req.body.description;
      doc.url = req.body.url;

      saveDocument(res, doc);
    }
  });
});

router.delete('/:id', (req, res, next) => {
  var query = {
    id: req.params.id
  };

  documentModel.findOne(query, (err, doc) => {
    if (err) {
      return res.status(500).json({
        title: 'No Document Found',
        error: err
      });
    }
    if (!doc) {
      return res.status(500).json({
        title: 'No Document Found',
        error: {
          documentId: req.params.id
        }
      });
    }
    deleteDocument(res, doc);
  });
});

module.exports = router;
