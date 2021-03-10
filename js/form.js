import { PRICES_RESOURCE } from './data.js';
import {initMap} from './map.js';
import createObjects from './util.js';

const OBJECT_QUANTITY = 10;

const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const address = document.querySelector('#address');


const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue
  price.min = minValue;
}

const updateAddress = (mainPinMarker) =>{
  address.value = `${mainPinMarker._latlng.lat} ${mainPinMarker._latlng.lng}`;
}

const initTypeChange = () => {
  type.addEventListener('change', () => {
    updatePrice();
  })
}

const setDefaultPrice = () => {
  updatePrice();
}

const initTimeChange = () => {
  timeIn.addEventListener('change', () => { timeOut.value = timeIn.value; })
  timeOut.addEventListener('change', () => { timeIn.value = timeOut.value; })
}

const initForm = () => {
  setDefaultPrice();
  initTypeChange();
  initTimeChange();
  initMap(templateObjects);
}

export { initForm, updateAddress };
