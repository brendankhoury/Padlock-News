const express = require('express');
const app = express();
const cors = require('cors');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
require('dotenv/config');


app.use(express.json());
app.use(bodyParser.json());

// Ads cors functionality to the application
app.use(cors());
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
    .toArray(function(err, docs) {
      res.send(docs)
    });
});
// return recent five articles
// app.get('/api/recentarticles', (req, res) => {
//   console.log("Call to /api/recentarticles made")
//   client.db("newssite_test").collection("articles")
//     .find()
//     .sort({ date_publish: -1})
//     .limit(5)
//     //.project({ _id: 1, description: 1, image_url: 1, title: 1})
//     .toArray(function(err, docs) {
      
//       // create a category 
//       const allText = {}
//       const key = 'news';
//       allText[key] = [];
//       const data = {
//         category: 'Recent News',
//         catetoryColor: '#ddd9fc',
//         categoryId: 1,
//         articles: []
//       };

//       // add each article to its corresponding category
//       var i = 0;
//       var len = docs.length;
//       for (; i < len; i++) {
//         console.log(docs[i].description)
//         data.articles.push({
//           title: docs[i].title, 
//           id: docs[i]._id, 
//           imageURL: docs[i].image_url, 
//           summary: docs[i].description, 
//           contents: docs[i].maintext
//         });
//       }

//       // push category info to allText
//       allText[key].push(data);
//       JSON.stringify(allText);
//       res.send(allText)
//     });
// });
    

// return a specific article given the id
app.get('/api/article/:id', (req, res) => {
  console.log("Call to /api/article/id made")
  client.db("newssite_test").collection("articles")
    .findOne({'_id':ObjectId(req.params.id)}, function(err, doc) {
      res.send(doc)
    });
});


// return articles based on the given keywords
app.get('/api/search', (req, res) => {
  console.log("Call to /api/search made")
  client.db("newssite_test").collection("articles")
    .find()
    .toArray(function(err, docs) {

      // create an array to store search results and an array of requested keywords
      matchArticles = [];
      kw = req.query.keywords.split(',');

      // go over each article and check if it corresponds to any given keywords
      var i = 0;
      var len1 = docs.length;
      for (; i < len1; i++) {
        var j = 0;
        var len2 = kw.length;
        for (; j < len2; j++) {

          // push the article to matchArticles if its keyword array includes any given keywords
          if (docs[i].keywords != null && docs[i].keywords.includes(kw[j])) {
            matchArticles.push(docs[i]);
            break;
          }
        }
      }
      res.send(matchArticles)
    });
});


client.close();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});