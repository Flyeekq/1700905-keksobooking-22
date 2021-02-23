import {createObjects} from './util.js';
import {fillingAds} from './layout.js';

const templateObjects = new Array(10).fill(null).map(() => createObjects());

fillingAds(templateObjects);
