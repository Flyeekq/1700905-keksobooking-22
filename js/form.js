import { PRICES_RESOURCE } from './data.js';

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const updatePrice = (minValue) => {
  price.placeholder = minValue
  price.min = minValue;
}

const initTypeChange = () => {
  type.addEventListener('change', (event) => {
    updatePrice(PRICES_RESOURCE[`${event.target.value}`]);
  })
}

const setDefaultPrice = () => {
  updatePrice(PRICES_RESOURCE[`${type.value}`]);
}


const initTimeChange = () => {
  timeIn.addEventListener('change', () => { timeOut.value = timeIn.value; })
  timeOut.addEventListener('change', () => { timeIn.value = timeOut.value; })
}

const initForm = () => {
  setDefaultPrice();
  initTypeChange();
  initTimeChange();
}

export { initForm };
