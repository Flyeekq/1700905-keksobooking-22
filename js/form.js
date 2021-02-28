import {PRICES_RESOURCE} from './data.js';

const initTypeChange = (type, price) => {type.addEventListener('change', (event) => {
  price.placeholder = PRICES_RESOURCE[`${event.target.value}`];

  const {placeholder} = price;
  price.min = placeholder;
})}

const setDefaultPrice = (type, price) => {
  price.placeholder = PRICES_RESOURCE[`${type.value}`];

  const {placeholder} = price;
  price.min = placeholder;
}

const initTimeChange = (timeIn, timeOut) => {
  timeIn.addEventListener('change', () => {timeOut.value = timeIn.value;})
  timeOut.addEventListener('change', () => {timeIn.value = timeOut.value;})
}

export {initTypeChange, setDefaultPrice, initTimeChange};
