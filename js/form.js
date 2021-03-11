import { PRICES_RESOURCE, GUESTS_RESOURCE} from './data.js';
// import {initMap} from './map.js';
// import createObjects from './util.js';
// import {createFetch} from './fetch.js'

// const OBJECT_QUANTITY = 10;
// const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

// const fetchAnimals = createFetch(
//   (animals) => {
//     initMap(animals);
//   },
//   (err) => {
//       console.log(err);
//   });

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const address = document.querySelector('#address');

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue
  price.min = minValue;
}

const updateAddress = (lat, lng) =>{
  address.value = `${lat} ${lng}`;
}

const updateCapacity = () => {
  let capacityChildren = capacity.children;

  for (let places of capacityChildren) {
    const roomsNumber = GUESTS_RESOURCE[`${rooms.value}`];

    places.removeAttribute('selected', 'selected');

    if (roomsNumber.includes(places.value)) {
      places.disabled = false;
      if (places.value == rooms.value) {
        places.setAttribute('selected', 'selected');
      }
    } else {
      places.disabled = true;
    }
  }
};

const initCapacityChange = () => {
  rooms.addEventListener('change', () => {
    updateCapacity();
  })
}

const initTypeChange = () => {
  type.addEventListener('change', () => {
    updatePrice();
  })
}

const setDefaultPrice = () => {
  updatePrice();
}

const setDefaultCapacity = () => {
  updateCapacity();
}

const initTimeChange = () => {
  timeIn.addEventListener('change', () => { timeOut.value = timeIn.value; })
  timeOut.addEventListener('change', () => { timeIn.value = timeOut.value; })
}

const initForm = () => {
  setDefaultPrice();
  setDefaultCapacity();
  initTypeChange();
  initTimeChange();
  initCapacityChange();
  // initMap(a);
  // fetchAnimals();
}

export { initForm , updateAddress };
