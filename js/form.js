import { PRICES_RESOURCE, GUESTS_RESOURCE} from './data.js';
import {initMap} from './map.js';
import createObjects from './util.js';

const OBJECT_QUANTITY = 10;

const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue
  price.min = minValue;
}

const updateCapacity = () => {
  let capacityChildren = capacity.children;

  for (let places of capacityChildren) {

    const roomsNumber = GUESTS_RESOURCE[`${rooms.value}`];

    if (roomsNumber.includes(places.value) ) {
      places.hidden = false;
      places.setAttribute('selected', 'selected');
    }
    else {
      places.hidden = true;
      places.removeAttribute('selected', 'selected');
    }
  }
}

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
  initMap(templateObjects);
}

export { initForm };
