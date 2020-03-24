import { checkerInput } from './checkerInput';
import { sendData } from './postData';
import { createTripCard } from './cardDOM';
import { showTripDetails } from './cardDetails';

const searchFlights = () => {
  const searchFlights = document.querySelector('#searchFlights');
  //submit Event listener
  searchFlights.addEventListener('submit', e => {
    // Check all inputs are validated
    const data = checkerInput();
    if (data === null) {
      M.toast({ html: 'Please fill all data ' });
    } else {
      sendData(data).then(res => {
        const { status, store } = res;
        if (status === 200) {
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

export { searchFlights };
