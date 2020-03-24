const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { getCountries, extractDataFromApi } = require('./api');

//Access .env file .
dotenv.config();

// Main route to index.html
router.get('/', (req, res) => {
  res.send('/dist/');
});
// Get countries route, Call this in client/js/getCountries
router.get('/countries', (req, res) => {
  getCountries().then(response => res.send(response));
});

//Receive data from client/js/searchFlight
router.post('/add_data', (req, res) => {
  const data = req.body;
  extractDataFromApi(data)
    .then(store => {
      return res.json({ status: 200, store });
    })
    .catch(err => res.json({ message: err }));
});
router.get('/test', (req, res) => res.json('Its working bro'));

module.exports = router;
