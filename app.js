const express = require('express');
const testRoutes = require('./routes/test');
var cors = require("cors");

const app = express();


app.use(cors());

app.use('/api/test', testRoutes);



app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});


app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;