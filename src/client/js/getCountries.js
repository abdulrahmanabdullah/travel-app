// const api = `http://api.geonames.org/search?q=${country}&username=${username}&type=json`;
// const apiDarkSky = `https://api.darksky.net/forecast/${key}/${lat},${lang}`;

async function getCountries(object = {}) {
  try {
    const response = await fetch('http://localhost:3003/countries');
    const data = await response.json();
    data.map(country => {
      object[country.name] = null;
    });
  } catch (err) {
    console.log(err);
  }
}

export { getCountries };
