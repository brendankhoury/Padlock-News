const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv/config');


app.use(express.json());
app.use(bodyParser.json());


// connect to mongodb
async function main() {
  const uri = process.env.CONNECT_TO_DB;
  const client = new MongoClient(uri, { useNewUrlParser: true}, { useUnifiedTopology: true });
  try {
    await client.connect();
    app.get('/', (req, res) => {
      res.send('homepage');
    });
    // return recent five articles
    app.get('/api/recentarticles', (req, res) => {
      const sortedArticles = client.db("newssite_test").collection("articles")
      .find().sort({ date_publish: -1});
      const results = sortedArticles.toArray();
      for (var count = 0; count < results.length && count < 5; count++) {
        res.send(results[count]);
      }
    });
    // return a specific article given the id
    app.get('/api/article/:id', (req, res) => {
      const oneArticle = client.db("newssite_test").collection("articles").findOne({'_id':req.params.id});
      res.send(oneArticle);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});

