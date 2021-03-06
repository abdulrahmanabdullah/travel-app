import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './styles/app.css';
// Init materialize functions.
import './js/materialUIFunctions';
import { searchFlights } from './js/searchFlights';
import { createTripCard } from './js/cardDOM';
import { showTripDetails } from './js/cardDetails';

document.addEventListener('DOMContentLoaded', () => {
  // go through into all keys in local storage then get data .
  // This working with production mode
  for (let item in localStorage) {
    const store = localStorage.getItem(item);
    const data = JSON.parse(store);
    if (localStorage.getItem(data[0].destination) !== null) {
      createTripCard();
      showTripDetails(data);
    }
  }
});
searchFlights();
