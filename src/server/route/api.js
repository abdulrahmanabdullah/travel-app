const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

//Extract all countries then send it to getCountries in front page.
async function getCountries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  return await response.json();
}
// Hard code to save all details.
const store = [];

// Convert date to get unix timestamp .
const getTimestamp = date => {
  return new Date(date).getTime() / 1000;
};

/**
 * @param {string} destination catch this value from req.body when user click searchFlight btn.
 * @param {string} date convert date @see getTimestamp func .
 */
async function getLatLang(allData) {
  const { destination, dateArrive } = allData;
  //Convert date.
  const timestamp = getTimestamp(dateArrive);
  //Fetch lat,lng
  // const data = await getlatt(destination);
  // const { lat, lng } = await data.geonames[0]; // Extract first object in array.
  // const weather = await getWeather(lat, lng, timestamp);
  // const { hits } = await getImage(destination);
  // const { webformatURL } = await hits[0]; // Get first result;
  // store.push(allData);
  // store.push(weather);
  // store.push({ img_res: webformatURL });
  let firstCall = getlatt(destination);
  let weather = firstCall.then(value => {
    const { geonames } = value;
    const { lat, lng } = geonames[0];
    return getWeather(lat, lng, timestamp);
  });
  let { hits } = getImage(destination);
  Promise.all([firstCall, weather, hits]).then(value => {
    console.log(value);
  });
  //   console.log('weather = ', weather);
}
async function getlatt(target) {
  const response = await fetch(
    `http://api.geonames.org/search?q=${target}&username=${process.env.USERNAME}&type=json`
  );
  return await response.json();
}
/**
 * Pass lat, lng and date arrive which came from getWeather func
 * @param {string} lat
 * @param {string} lng
 * @param {string} timestamp
 */
async function getWeather(lat, lng, timestamp) {
  const res = await fetch(
    `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng},${timestamp}?exclude=daily,flags,hourly`
  );
  return await res.json();
}
async function getImage(city) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}&image_type=photo&pretty=true`
  );
  return await response.json();
}
// Get countries route, Call this in client/js/getCountries
router.get('/countries', (req, res) => {
  getCountries().then(response => res.send(response));
});

//Receive data from client/js/searchFlight
router.post('/add_data', (req, res) => {
  const data = req.body;
  try {
    getLatLang(data).then(() => {
      return res.send({ status: 200, store });
    });
  } catch (err) {
    res.status(404).json({ message: err });
  } // getLatLang(data)
  //   .then(() => {
  //     return res.send({ status: 200, store });
  //   })
  //   .catch(err => res.status(404).json({ message: err }));

  //   return res.send({ object: 'Some object here.' });
});
router.get('/test', (req, res) => res.json('Its working bro'));

module.exports = router;
