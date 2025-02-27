const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});


app.get('/beers', async (req, res) => {
  const beersFromAPI = await punkAPI.getBeers();
  res.render('beers.hbs', {beersFromAPI});
  console.log(beersFromAPI);
});

app.get('/random-beer', async (req, res) => {
  const randomBeerFromAPI = await punkAPI.getRandom();
  res.render('random-beer.hbs', {randomBeerFromAPI});
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
