import {CHEKIN, CHEKOUT, FEATURES, PHOTOS, TYPES, DESCRIPTIONS} from './data.js';

const locationCoords = {
  MIN_X: 35.65000,
  MAX_X: 35.70000,
  MIN_Y: 139.70000,
  MAX_Y: 139.80000,
  PRECISION: 5,
}

const NumberLimits = {
  ZERO: 0,
  ONE: 1,
  EIGHT: 8,
  TEN: 10,
  P_INFINITY: 1000000,
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomFeatures = (features) => {
  let newArray = features.slice();
  let randomNumber = getRandomNumber(0, newArray.length - 1);
  newArray.sort(() => 0.5 - randomNumber);
  features.splice(randomNumber, randomNumber)

  return newArray;
};

const getRandomNumber = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return Math.round(num)
}

const getRandomFloatNumber = (min, max, precision) => {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return num.toFixed(precision);
}

const createObjects = () => {

  let location = {
    x: getRandomFloatNumber(locationCoords.MIN_X, locationCoords.MAX_X, locationCoords.PRECISION),
    y: getRandomFloatNumber(locationCoords.MIN_Y, locationCoords.MAX_Y, locationCoords.PRECISION),
  }
  let features = getRandomFeatures(FEATURES);

  return {
    autor: {avatar: `img/avatars/user0${getRandomNumber(NumberLimits.ONE, NumberLimits.EIGHT)}.png`},
    offer: {
      title: 'Объявление',
      address: `${location.x} ${location.y}`,
      price: getRandomNumber(NumberLimits.ZERO, NumberLimits.P_INFINITY),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(NumberLimits.ONE, NumberLimits.TEN),
      guests: getRandomNumber(NumberLimits.ONE, NumberLimits.TEN),
      checkin: getRandomArrayElement(CHEKIN),
      checkout: getRandomArrayElement(CHEKOUT),
      features: features,
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: location,
  }
}

export default createObjects;
