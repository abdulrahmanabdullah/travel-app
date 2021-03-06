import { checkerInput } from './checkerInput';
import { sendData } from './postData';
import { createTripCard } from './cardDOM';
import { showTripDetails } from './cardDetails';
import { compareDate } from './compareDate';

const searchFlights = () => {
  const searchFlights = document.querySelector('#searchFlights');
  //submit Event listener
  searchFlights.addEventListener('submit', e => {
    // Check all inputs are validated
    const data = checkerInput();

    if (data === null) {
      M.toast({ html: 'Please fill all data ' });
    } else if (!compareDate(data.dateArrive, data.dateDeparture)) {
      M.toast({ html: 'Please enter correct date ' });
    } else {
      sendData(data)
        .then(res => {
          const { status, store } = res;
          if (status === 200) {
            M.toast({ html: 'Great wait a second please.' });
            createTripCard();
            showTripDetails(store);
          }
        })
        .catch(err => {
          M.toast({
            html: `some error ocurred please try again, ${err.message}`,
          });
        });
    }
    e.preventDefault();
  });
};

export { searchFlights };
