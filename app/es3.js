/*eslint-env node*/

var express = require('express');
var app = express();

var countries = require('countryjs');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es2', {message: 'impariamo la geografia', title:'fila B'});
});

app.get('/info', function (req, res) {
  var nazione = req.query.nazione;
  var lingua = req.query.lingua;
  // per vedere che cosa ha selezionato l'utente ho due possibilità
  // la prima è usare uno switch per vedere la lingua selezionata
  // e poi ndare a prendere la traduzione con
  // traduzione: countries.info(nazione, 'name').translations.de oppure
  // traduzione: countries.info(nazione, 'name').translations.it e così via
  switch (lingua) {
    case 'de': res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations.de}); break;
    case 'it': res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations.it}); break;
    case 'es': res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations.es}); break;
    case 'ja': res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations.ja}); break;
    case 'fr': res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations.fr}); break;
  }
  // la seconda è quella di non utilizzare lo switch ma di selezioanr edirettamente la traduzione
  // con countries.info(nazione, 'name').translations[lingua]
  // in pratica translations[lingua] va a prendere il campo di translations inserito in lingua: se in lingua c'è
  // il valore 'de', l'interprete eseguirà translations.de e così via. // l'istruzione - unica - sarà quindi: 
  // res.render('es3', {message: 'impariamo la geografia', title:'fila B', traduzione: countries.info(nazione, 'name').translations[lingua]});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

