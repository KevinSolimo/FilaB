/*eslint-env node*/

var express = require('express');
var app = express();

var countries = require('countryjs');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es5', {message: 'impariamo la geografia', title:'fila B'});
});

app.get('/continent', function (req, res) {
  var continent = req.query.continent;
  // carico tutte le nazioni
  var nazioni = countries.all();
  // preparo un vettore vuoto per mettere il risultato, cioè l'elenco delel nazioni di quel continente
  var result = [];
  // ciclo su tutte le nazioni - prendendone una alla volta - per cercare quelle che sono nel continente selezionato
  nazioni.forEach(function(nazione){
    if (nazione.region == continent) {
        // se la nazione appartiene a quel continente, la salvo nel vettore risultato
        result.push(nazione.name);
    }     
  });
  // restituisco il risultato
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
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

