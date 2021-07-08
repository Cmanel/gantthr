const express = require('express');

const router = express.Router();

router.get('/accueilSite', function (req, res, next) {
  // renvoyer un json avec une liste d'elements nomdu site / presentation gnralesalon de the / presentation equipe/
  // adresse/mail/telephone
  res.send('API is working properly');
});

module.exports = router;
