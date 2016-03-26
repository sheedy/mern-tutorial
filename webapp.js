var url = 'mongodb://localhost:27017/bugtracker';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var connection = null;

var app = express();

app.use(bodyParser.json());

var root = __dirname + '/public';
app.use(express.static(root));

app.get('/api/bugs', function(req, res) {
  var filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;
  findBugs(connection, filter, function(data) {
    res.json(data);
  });
});

app.get('/api/bugs/:id', function(req, res) {
  var id = req.params.id;
  connection.collection('bugs').find({_id: ObjectId(id)}).limit(1).next(function(err, doc){
    res.json(doc);
  });
});

app.post('/api/bugs/', function(req, res) {
  var bug = req.body;
  connection.collection('bugs').insertOne(bug, function(err, result) {
    var newId = result.insertedId;
    connection.collection('bugs').find({_id: newId}).limit(1).next(function(err, doc){
      res.json(doc);
    });
  });
});

app.put('/api/bugs/:id', function(req, res) {
  var id = req.params.id;
  var bug = req.body;
  connection.collection('bugs').findAndModify({_id: ObjectId(id)}, {}, bug, {'new': true}, function(err, result) {
    res.json(result);
  });
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("MongoDB connection: OK.");
  connection = db;
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});

var findBugs = function(db, filter, callback) {
   var cursor = db.collection('bugs').find(filter);
   var bugs = [];
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        bugs.push(doc);
      } else {
         callback(bugs);
      }
   });
};
