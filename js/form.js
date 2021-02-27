import {PRICES_RESOURCE} from './data.js';

const evaluatePrice = (price) =>{
  const {placeholder, value } = price;

  if (+value < +placeholder || value == '') {
    price.value = placeholder;
  }
}

const typeChangeEvt = (type, price) => {type.addEventListener('change', (event) => {
  price.placeholder = PRICES_RESOURCE[`${event.target.value}`];
  evaluatePrice(price);
})}

const priceChangeEvt = (price) => {price.addEventListener('change', () => {
  evaluatePrice(price);
})}

const addDefaultPrice = (type, price) => {
  price.placeholder = PRICES_RESOURCE[`${type.value}`];
  evaluatePrice(price);
}

const timeChangeEvts = (timeIn, timeOut) => {
  timeIn.addEventListener('change', () => {timeOut.value = timeIn.value;})
  timeOut.addEventListener('change', () => {timeIn.value = timeOut.value;})
}

export {typeChangeEvt, priceChangeEvt, addDefaultPrice, timeChangeEvts};
