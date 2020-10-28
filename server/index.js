const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
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
  const oneArticle = client.db("newssite_test").collection("articles").findOne({'_id':req.params.id});
  res.send(oneArticle);
});


client.close();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});

