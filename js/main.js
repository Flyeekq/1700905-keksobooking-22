import createObjects from './util.js';
import renderCard from './layout.js';
import {typeChangeEvt, priceChangeEvt, addDefaultPrice, timeChangeEvts} from './form.js';

const OBJECT_QUANTITY = 10;

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

renderCard(templateObjects[0]);

addDefaultPrice(type, price);

typeChangeEvt(type, price);
priceChangeEvt(price);
timeChangeEvts(timeIn, timeOut);
