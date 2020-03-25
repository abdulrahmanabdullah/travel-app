function covertTimezone(timezone) {
  return new Date(timezone * 1000)
    .toISOString()
    .slice(10, 19)
    .replace('T', ' ');
}
export function showTripDetails(store) {
  // Get trip info
  const { origin, destination, dateDeparture, dateArrive } = store[0];
  // Get weather object
  const { time, summary, cloudCover, temperature, dewPoint } = store[1];
  //Get image object
  const { img_res } = store[3];
  const tripImg = document.querySelector('.trip-img');
  tripImg.src = img_res;
  tripImg.alt = destination;
  const originResult = document.querySelector('.origin-result');
  originResult.innerHTML = `Your trip: ${origin} To ${destination}`;
  const departingUI = document.querySelector('.departing-date-result');
  const weatherDetails = document.querySelector('.weather-details');
  weatherDetails.innerHTML = `Typical weather for then is :
    <br/>Time : ${covertTimezone(time)} <br/>
  High:<span class='red-text'>${temperature}</span> - Low:<span class='green-text'>${dewPoint}</span><br/> and summary ${summary}`;
  departingUI.innerHTML = `Departing at ${dateDeparture}`;
  saveTrip(store);
  removeTrip(destination);
}

//save trip in local storage
function saveTrip(store) {
  const saveTripBtn = document.querySelector('.save-trip');
  saveTripBtn.addEventListener('click', e => {
    if (localStorage.getItem(store[0].destination) === null) {
      localStorage.setItem(
        store[0].destination,
        JSON.stringify(store, null, 2)
      );
      M.toast({ html: 'Successfully saved 👍🏻', displayLength: 8000 });
    } else {
      return;
    }
  });
}

//remove trip in local storage
function removeTrip(item) {
  const removeTripBtn = document.querySelector('.remove-trip');
  removeTripBtn.addEventListener('click', () => {
    if (localStorage.getItem(item) !== null) {
      localStorage.removeItem(item);
      M.toast({ html: 'Successfully removed 👍🏻', displayLength: 8000 });
    } else {
      return;
    }
  });
}
