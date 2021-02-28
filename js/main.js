import createObjects from './util.js';
import renderCard from './layout.js';
import {initForm} from './form.js';

const OBJECT_QUANTITY = 10;

const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

renderCard(templateObjects[0]);

initForm();
