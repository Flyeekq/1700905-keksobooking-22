const CHEKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHEKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const DESCRIPTIONS = [
  'просторная светлое помещение',
  'не очень просторное и темное помещение',
  'компактно и светло',
  'большая площадь территории',
  'просторный двор',
];

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
  let features = getRandomFeatures(FEATURES);

  return {
    autor: {avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`},
    offer: {
      title: 'Объявление',
      address: `${location.x} ${location.y}`,
      price: getRandomNumber(0, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(0, 10),
      guests: getRandomArrayElement(TYPES),
      checkin: getRandomArrayElement(CHEKIN),
      checkout: getRandomArrayElement(CHEKOUT),
      features: features,
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: location,
  }
}

const templateObjects = new Array(10).fill(null).map(() => createObjects());

console.log(templateObjects);
