import * as data from './data';


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

function getRandomNumber(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return Math.round(num)
}

function getRandomFloatNumber(min, max, precision) {
  min = Math.abs(min);
  max = Math.abs(max);

  let tempMin = Math.min(min, max);
  let tempMax = Math.max(min, max);

  let num = Math.random() * (tempMax - tempMin) + tempMin;

  return num.toFixed(precision);
}


const createObjects = () => {

  let location = {x: getRandomFloatNumber(35.65000, 35.70000, 5), y: getRandomFloatNumber(139.70000, 139.80000, 5)}
  let features = getRandomFeatures(data.FEATURES);

  return {
    autor: {avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`},
    offer: {
      title: 'Объявление',
      address: `${location.x} ${location.y}`,
      price: getRandomNumber(0, 1000000),
      type: getRandomArrayElement(data.TYPES),
      rooms: getRandomNumber(0, 10),
      guests: getRandomArrayElement(data.TYPES),
      checkin: getRandomArrayElement(data.CHEKIN),
      checkout: getRandomArrayElement(data.CHEKOUT),
      features: features,
      description: getRandomArrayElement(data.DESCRIPTIONS),
      photos: getRandomArrayElement(data.PHOTOS),
    },
    location: location,
  }
}

export {createObjects};
