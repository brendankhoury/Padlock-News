const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
require('dotenv/config');


app.use(express.json());
app.use(bodyParser.json());
    

app.get('/', (req, res) => {
  res.send('homepage');
});
    

// connect to mongodb
const uri = process.env.CONNECT_TO_DB;
const client = new MongoClient(uri, { useNewUrlParser: true}, { useUnifiedTopology: true });
client.connect();


// return all the articles
app.get('/api/feedAll', (req, res) => {
  console.log("Call to /api/feedAll made")
  client.db("newssite_test").collection("articles")
    .find()
    .project({ _id: 1, description: 1, image_url: 1, title: 1})
    .toArray(function(err, docs) {
      res.send(docs)
    });
});


// return recent five articles
app.get('/api/recentarticles', (req, res) => {
  console.log("Call to /api/recentarticles made")
  client.db("newssite_test").collection("articles")
    .find()
    .sort({ date_publish: -1})
    .limit(5)
    .project({ _id: 1, description: 1, image_url: 1, title: 1})
    .toArray(function(err, docs) {
      res.send(docs)
    });
});
    

// return a specific article given the id
app.get('/api/article/:id', (req, res) => {
  console.log("Call to /api/article/id made")
  client.db("newssite_test").collection("articles")
    .findOne({'_id':ObjectId(req.params.id)}, function(err, doc) {
      res.send(doc)
    });
});


client.close();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});

