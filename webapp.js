const url = 'mongodb://localhost:27017/bugtracker';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`Connection error: ${err}`);
  process.exit(1);
});
db.once('open', () => {
  console.log('Connected to MongoDB server.');
});

const bugSchema = new mongoose.Schema({
  title: String,
  status: String,
  owner: String,
  priority: String,
});
const bugModel = mongoose.model('bug', bugSchema);

const app = express();
app.use(bodyParser.json());
const root = `${__dirname}/public`;
app.use(express.static(root));

app.get('/api/bugs', (req, res) => {
  const filter = {};
  if (req.query.priority) {
    filter.priority = req.query.priority;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }

  bugModel.find(filter, (err, bugs) => {
    if (err) {
      return console.error(err);
    }
    return res.json(bugs);
  });
});

app.get('/api/bugs/:id', (req, res) => {
  const id = new mongoose.mongo.ObjectId(req.params.id);
  bugModel.findOne({
    _id: id,
  }, (err, bug) => {
    if (err) {
      return console.error(err);
    }
    return res.json(bug);
  });
});

app.post('/api/bugs/', (req, res) => {
  const bug = bugModel(req.body);
  bug.save((err, savedBug) => {
    if (err) {
      return console.error(err);
    }
    return res.json(savedBug);
  });
});

app.put('/api/bugs/:id', (req, res) => {
  const id = new mongoose.mongo.ObjectId(req.params.id);
  const bug = req.body;
  bugModel.findOneAndUpdate({
    _id: id,
  }, bug, {
    new: true,
  }, (err, updatedBug) => {
    if (err) {
      return console.error(err);
    }
    return res.json(updatedBug);
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
