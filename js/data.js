const TYPE = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
};

const TYPE_RESOURCE = {
  [TYPE.PALACE]: 'Дворец',
  [TYPE.FLAT]: 'Квартира',
  [TYPE.HOUSE]: 'Дом',
  [TYPE.BUNGALOW]: 'Бунгало',
};

const TYPES = [TYPE.PALACE, TYPE.FLAT, TYPE.HOUSE, TYPE.BUNGALOW];

const PRICES_RESOURCE = {
  [TYPE.PALACE]: 10000,
  [TYPE.FLAT]: 1000,
  [TYPE.HOUSE]: 5000,
  [TYPE.BUNGALOW]: 0,
};

const GUESTS = {
  ANY: 'any',
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3',
};

const GUESTS_RESOURCE = {
  [GUESTS.ANY]: ['any'],
  [GUESTS.ZERO]: ['0'],
  [GUESTS.ONE]: ['1'],
  [GUESTS.TWO]: ['1', '2'],
  [GUESTS.THREE]: ['1', '2', '3'],
};

export { TYPE, TYPES, TYPE_RESOURCE, PRICES_RESOURCE, GUESTS_RESOURCE };
