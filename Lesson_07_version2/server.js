const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(cors());

app.get('/catalog', (req, res) => {
  fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(404);
    res.send(data);
  })
});

app.get('/getCart', (req, res) => {
  fs.readFile('data/cart.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(404);
    res.send(data);
  })
});

app.post('/addStats', (req, res) => {
  const newState = req.body;
  fs.readFile('data/stats.json', 'utf-8', (err, data) => {
    if (err) res.sendStatus(500);
    let stats = null;
    try {
      stats = JSON.parse(data);
    } catch(e){
      stats = data;
    }
    stats.push(newState);
    fs.writeFile('data/stats.json', JSON.stringify(stats), (err) => {
      if (err) {
        res.sendStatus(500);
        console.error(err)};
      res.sendStatus(200);
    })
  })
});

app.post('/addCart', (req, res) => {
  const cart = req.body;
    fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
      if (err) res.sendStatus(500);
      res.sendStatus(200);
    })
});

app.post('/removeCart', (req, res) => {
  const cart = req.body;
  fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  })
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
