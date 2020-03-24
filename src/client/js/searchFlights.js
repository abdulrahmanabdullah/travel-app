import { checkerInput } from './checkerInput';

const sendData = async data => {
  const request = await fetch('http://localhost:3003/add_data', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await request.json();
};
const searchFlights = () => {
  const searchFlights = document.querySelector('#searchFlights');
  //submit Event listener
  searchFlights.addEventListener('submit', e => {
    const data = checkerInput();
    // Check all inputs are validated
    if (data === null) {
      M.toast({ html: 'Please fill all data ' });
    } else {
      sendData(data).then(res => {
        const { status, store } = res;
        if (status === 200) {
          //TODO:: create function to catch store from response to create table with values.
          M.toast({ html: 'Great wait a second please.' });
          console.log(store);
          createTripCard(true);
          showTripDetails(store);
        }
      });
    }
    e.preventDefault();
  });
};
function showTripDetails(store) {
  // Get trip info
  const { origin, destination, dateDeparture } = store[0];
  // Get weather object
  const {
    time,
    apparentTemperature,
    summary,
    cloudCover,
    temperature,
    dewPoint,
  } = store[1];
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
  <span>High:${temperature}</span> - <span>Low:${dewPoint}</span><br/> and summary ${summary}`;
  departingUI.innerHTML = `Departing at ${dateDeparture}`;
  const saveTripBtn = document.querySelector('.save-trip');
  const removeTripBtn = document.querySelector('.remove-trip');
}
function covertTimezone(timezone) {
  return new Date(timezone * 1000)
    .toISOString()
    .slice(10, 19)
    .replace('T', ' ');
}
// check if any trips in local storage .
function createMainCard(element) {
  // if data in local storage call create trip func
  // else create new one
  if (true) {
  }
}
function createTripCard(isNewTrip) {
  const cardEntry = document.querySelector('.card-entry');
  if (isNewTrip) {
    cardEntry.innerHTML = '';
  }
  const mainCard = document.createElement('div');
  mainCard.classList.add('card-panel');
  const gridInCard = document.createElement('div');
  gridInCard.classList.add('row'); // Row in line 141
  const colImage = document.createElement('div');
  colImage.classList.add('col', 's12', 'm6', 'l6');
  const image = document.createElement('img');
  image.classList.add('trip-img');
  image.style.width = '100%';
  //Inject image into colImage in line 143
  colImage.append(image);
  //Inject colImage into gridInCard
  gridInCard.append(colImage);
  // Details section: origin, destination, 2 buttons and weather
  const colDetails = document.createElement('div');
  colDetails.classList.add('col', 's12', 'm6', 'l6'); //Here it's line 146
  //Row inside details section
  const rowAndFlowText = document.createElement('div'); // line 147
  rowAndFlowText.classList.add('row', 'flow-text');
  const headersCard = document.createElement('div');
  headersCard.classList.add('col', 's12', 'm12');
  const hOrigin = document.createElement('p');
  hOrigin.classList.add('text-content', 'origin-result'); // line 150
  const hDeparting = document.createElement('h6');
  hDeparting.classList.add('departing-date-result');
  // Inject two dives into headersCard
  headersCard.append(hOrigin);
  headersCard.append(hDeparting);
  //Inject headersCard into rowAndFlowText
  rowAndFlowText.append(headersCard);
  const buttonsSection = document.createElement('div');
  buttonsSection.classList.add('col', 's12', 'm12');
  const saveTripButton = document.createElement('button');
  saveTripButton.classList.add(
    'waves-effect',
    'waves-light',
    'btn-small',
    'save-trip'
  );
  saveTripButton.innerHTML = 'Save Trip';
  const removeTripButton = document.createElement('button');
  removeTripButton.classList.add(
    'waves-effect',
    'waves-light',
    'btn-small',
    'remove-trip'
  );
  removeTripButton.innerHTML = 'Remove Trip';
  //Inject buttons into buttonsSection
  buttonsSection.append(saveTripButton);
  buttonsSection.append(removeTripButton);
  //Inject buttons section into rowAndFlowText
  rowAndFlowText.append(buttonsSection); // line 158
  const weatherSection = document.createElement('div');
  weatherSection.classList.add('col', 's12', 'm12');
  const weatherDetails = document.createElement('p');
  weatherDetails.classList.add('weather-details');
  //Inject weather details into weather section
  weatherSection.append(weatherDetails);
  //Inject weather section into rowAndFlowText
  rowAndFlowText.append(weatherSection);
  // Inject all inner details in colDetails
  colDetails.append(rowAndFlowText);
  //Inject colDetails into gridInCard
  gridInCard.append(colDetails);
  //Append gridInCard in mainCard
  mainCard.append(gridInCard);
  cardEntry.append(mainCard);
}
export { searchFlights };
