import {createObjects} from './util';

const templateObjects = new Array(10).fill(null).map(() => createObjects());


function fillingAds(templateObjects) {

  for (const i in templateObjects) {
    if (Object.hasOwnProperty.call(templateObjects, i)) {
      const element = templateObjects[i];
      console.log(element);
    }
  }
}

fillingAds(templateObjects);
