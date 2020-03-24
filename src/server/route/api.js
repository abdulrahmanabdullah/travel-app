const fetch = require('node-fetch');

//Extract all countries then send it to getCountries in front page.
const getCountries = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  return await response.json();
};

const getTimestamp = date => {
  return new Date(date).getTime() / 1000;
};

/**
 * @param {string} target specific country
 */

async function getLatLng(target) {
  const response = await fetch(
    `http://api.geonames.org/search?q=${target}&username=${process.env.USERNAME}&type=json`
  );
  const data = await response.json();
  const { geonames } = await data; //  lat,lng live in geonames so extract it
  return await geonames[0]; // return first object in geonames array.
}

/**
 * Pass lat, lng and date arrive which came from getWeather func
 * @param {string} lat
 * @param {string} lng
 * @param {string} timestamp
 */

async function getWeather(lat, lng, timestamp) {
  // Call currently weather
  const res = await fetch(
    `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng},${timestamp}?exclude=daily,flags,hourly`
  );
  return await res.json();
}

/**
 * @param {string} city = trip destination
 *  */

async function getImage(city) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}&image_type=photo&pretty=true`
  );
  const data = await response.json();
  const { hits } = await data;
  const { webformatURL } = await hits[0];
  return await webformatURL;
}

/**
 * @param {object} allDate catch origin,destination,dateArrive and time then send it to
 * @see [getLatLng,getWeather,getImage]  promise func .
 */

async function extractDataFromApi(allData) {
  let arr = [];
  const { destination, dateArrive } = allData;
  const timestamp = getTimestamp(dateArrive);
  arr.push(allData);
  // Call first promise
  let firstCall = getLatLng(destination);
  let weather = firstCall.then(({ lat, lng }) => {
    // return second promise
    return getWeather(lat, lng, timestamp);
  });
  // Call third promise
  let imageRes = getImage(destination);
  // Combine all promises then return only one value.
  return Promise.all([weather, imageRes])
    .then(value => {
      value.map(item => {
        const { currently } = item;
        arr.push(currently);
      });
      const imageRes = value.slice(-1)[0]; // Get last value of promise.
      arr.push({ img_res: imageRes });
      return arr;
    })
    .catch(err => arr.push({ err }));
}
module.exports = { getCountries, extractDataFromApi };
