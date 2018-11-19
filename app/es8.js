/*eslint-env node*/

var express = require('express');
var app = express();

var countries = require('countryjs');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es7', {message: 'impariamo la geografia', title:'fila B'});
});

app.get('/:continent', function (req, res) {
  var continent = req.params.continent;
  var nazioni = countries.all();
  var result = [];
  nazioni.forEach(function(nazione){
    if (nazione.region == continent) {
        result.push(nazione.name);
    }     
  });
  res.render('es8', {result: result, message: 'impariamo la geografia', title:'fila B'});
});

// in questo caso la nazione è preceduta dalla rotta /capitale epr differenziarla dalla rotta continente
// dell'esercizio precedente
app.get('/capitale/:nazione', function (req, res) {
  var nazione = req.params.nazione;
  res.render('es8bis', {capitale: countries.capital(nazione, 'name'), message: 'impariamo la geografia', title:'fila B'});
});

app.get('/continent', function (req, res) {
  var continent = req.query.continent;
  var nazioni = countries.all();
  var result = [];
  nazioni.forEach(function(nazione){
    if (nazione.region == continent) {
        result.push(nazione.name);
    }     
  });
  res.render('es6', {result: result, message: 'impariamo la geografia', title:'fila B'});
});

app.get('/info', function (req, res) {
  var nazione = req.query.nazione;
  var lingue = req.query.lingua;
  var result = [];
  lingue.forEach(function(lingua) {
    switch (lingua) {
        case 'de': result.push({lingua:'de', traduzione: countries.info(nazione, 'name').translations.de}); break;
        case 'it': result.push({lingua:'it', traduzione: countries.info(nazione, 'name').translations.it}); break;
        case 'es': result.push({lingua:'es', traduzione: countries.info(nazione, 'name').translations.es}); break;
        case 'ja': result.push({lingua:'ja', traduzione: countries.info(nazione, 'name').translations.ja}); break;
        case 'fr': result.push({lingua:'fr', traduzione: countries.info(nazione, 'name').translations.fr}); break;
    }
  });
  res.render('es4bis', {message: 'impariamo la geografia', title:'fila B', result: result}); 

  // alternativa senza switch:
  // res.render('es3', {traduzione: countries.info(nazione, 'name').translations[lingua]}, message: 'impariamo la geografia', title:'fila B', );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

