const express = require('express');
const cors = require('cors')
const app = express();
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
require('dotenv/config');


app.use(express.json());
app.use(bodyParser.json());

// Ads cors functionality to the application
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  res.send('homepage');
});
    

// connect to mongodb
const uri = process.env.CONNECT_TO_DB;
const client = new MongoClient(uri, { useNewUrlParser: true}, { useUnifiedTopology: true });
client.connect();


// return recent five articles
app.get('/api/recentarticles', (req, res) => {
  console.log("Call to /api/recentarticles made")
  client.db("newssite_test").collection("articles")
    .find()
    .sort({ date_publish: -1})
    .limit(5)
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

