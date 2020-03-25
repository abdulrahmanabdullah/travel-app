export const getCountries = async (object = {}) => {
  try {
    const response = await fetch('http://localhost:3003/countries');
    const data = await response.json();
    data.map(country => {
      object[country.name] = null;
    });
  } catch (err) {
    console.log(err);
  }
};
