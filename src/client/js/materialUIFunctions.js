import { getCountries } from './getCountries';
const sidenav = document.querySelector('.sidenav');
M.Sidenav.init(sidenav, {});
const dateDeparture = document.querySelectorAll('.datepicker');
M.Datepicker.init(dateDeparture, {
  autoClose: true,
  defaultDate: new Date().getMonth(),
  format: 'mmm dd,yyyy',
  onSelect: function() {
    return dateDeparture.value;
  },
});

const countries = {}; // Assign new object to pass it in autocomplete init
getCountries(countries); // Promise function return object when resolve.
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: countries,
});
