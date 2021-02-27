
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

const TYPE = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
};

const TYPE_RESOURCE = {
  [TYPE.PALACE]: 'Дворец',
  [TYPE.FLAT]:'Квартира',
  [TYPE.HOUSE]:'Дом',
  [TYPE.BUNGALOW]:'Бунгало',
}

const TYPES = [
  TYPE.PALACE,
  TYPE.FLAT,
  TYPE.HOUSE,
  TYPE.BUNGALOW,
];

const DESCRIPTIONS = [
  'просторная светлое помещение',
  'не очень просторное и темное помещение',
  'компактно и светло',
  'большая площадь территории',
  'просторный двор',
];

export {CHEKIN, CHEKOUT, FEATURES, PHOTOS, TYPE, TYPES, TYPE_RESOURCE, DESCRIPTIONS};
