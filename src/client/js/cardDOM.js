function mainCardSection(element) {
  const mainCard = document.createElement('div');
  mainCard.classList.add('card-panel');
  const gridInCard = document.createElement('div');
  gridInCard.classList.add('row'); // Row in line 141
  //Put Image card into gridInCard
  imageSection(gridInCard);
  //Inject colDetails into gridInCard
  gridInCard.append(rowSection());
  //Append gridInCard in mainCard
  mainCard.append(gridInCard);
  element.append(mainCard);
}

function buttonsSection(element) {
  // Button Div
  const buttonsDIV = document.createElement('div');
  buttonsDIV.classList.add('col', 's12', 'm12');
  const saveTripBtnDiv = document.createElement('div');
  saveTripBtnDiv.classList.add('col', 's6', 'm6');
  const saveTripButton = document.createElement('button');
  saveTripButton.classList.add(
    'waves-effect',
    'waves-light',
    'btn-small',
    'save-trip'
  );
  saveTripButton.innerHTML = 'Save Trip';
  const removeTripButtonDiv = document.createElement('div');
  removeTripButtonDiv.classList.add('col', 's6', 'm6');
  const removeTripButton = document.createElement('button');
  removeTripButton.classList.add(
    'waves-effect',
    'waves-light',
    'btn-small',
    'remove-trip'
  );
  removeTripButton.innerHTML = 'Remove Trip';
  //Inject buttons into buttonsSection
  saveTripBtnDiv.append(saveTripButton);
  removeTripButtonDiv.append(removeTripButton);
  buttonsDIV.append(saveTripBtnDiv);
  buttonsDIV.append(removeTripButtonDiv);
  element.append(buttonsDIV);
}

function imageSection(element) {
  const colImage = document.createElement('div');
  colImage.classList.add('col', 's12', 'm6', 'l6');
  const image = document.createElement('img');
  image.classList.add('trip-img');
  image.style.width = '100%';
  //Inject image into colImage in line 143
  colImage.append(image);
  //Inject colImage into gridInCard
  element.append(colImage);
}

function headerCardSection(element) {
  const headersCard = document.createElement('div');
  headersCard.classList.add('col', 's12', 'm12');
  const hOrigin = document.createElement('p');
  hOrigin.classList.add('text-content', 'origin-result'); // line 150
  const hDeparting = document.createElement('h6');
  hDeparting.classList.add('departing-date-result');
  // Put two dives into headersCard
  headersCard.append(hOrigin);
  headersCard.append(hDeparting);
  element.append(headersCard);
}

function weatherSection(element) {
  const weatherSection = document.createElement('div');
  weatherSection.classList.add('col', 's12', 'm12');
  const weatherDetails = document.createElement('p');
  weatherDetails.classList.add('weather-details');
  //Put weather details into weather section
  weatherSection.append(weatherDetails);
  element.append(weatherDetails);
}
function rowSection() {
  // Details section: origin, destination, 2 buttons and weather
  const colDetails = document.createElement('div');
  colDetails.classList.add('col', 's12', 'm6', 'l6'); //Here it's line 146
  //Row inside details section
  const rowAndFlowText = document.createElement('div'); // line 147
  rowAndFlowText.classList.add('row', 'flow-text');
  // Put headers details origin, destination.
  headerCardSection(rowAndFlowText);
  // create Save and remove button element
  buttonsSection(rowAndFlowText);
  // Put weather details
  weatherSection(rowAndFlowText);
  colDetails.append(rowAndFlowText);
  return colDetails;
}
export function createTripCard() {
  const cardEntry = document.querySelector('.card-entry');
  cardEntry.innerHTML = ''; // remove pervious  result.
  document.querySelector('.no-trips-msg').innerHTML = ''; // Remove 'no trip yet '
  // Create card.
  mainCardSection(cardEntry);
}
