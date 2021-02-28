import { PRICES_RESOURCE } from './data.js';

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue
  price.min = minValue;
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
}

export { initForm };
