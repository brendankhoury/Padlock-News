const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/news', (req, res) => {
  res.send(articles)
})

app.post('/api/news', (req, res) => {
  const article = {
    
  };
});

app.get('/api/news/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).send('The article with the given ID was not found');
  }
  res.send(article);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}...`);
});

