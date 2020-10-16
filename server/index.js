const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(express.json());
app.use(bodyParser.json());

// import routes
const articlesRt = require('./routes/articles'); 

app.use('./articles', articlesRt); 


// connect to mongodb and call functions to return articles
async function main() {
  const uri = process.env.CONNECT_TO_DB;
  const client = new MongoClient(uri, { useNewUrlParser: true}, { useUnifiedTopology: true });
  try {
    await client.connect();
    await returnAll(client);
    await returnRecent(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);

// return the most recent articles
async function returnRecent(client) {
  const sortedArticles = await client.db("newssite_test").collection("articles")
    .find().sort({ date_publish: -1});
  const results = await sortedArticles.toArray();
  console.log("The most recent article is: ");
  console.log(results[0]);
}


// return all the articles
async function returnAll(client) {
  const allArticles = await client.db("newssite_test").collection("articles").find();
  const results = await allArticles.toArray();
  console.log("All the articles: ");
  results.forEach(result => {
    console.log(result);
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});
