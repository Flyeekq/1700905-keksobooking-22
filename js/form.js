import {
  PRICES_RESOURCE,
  GUESTS_RESOURCE,
  MAIN_COORDS,
  PRICES_RANGE,
} from './costs.js';
import { uploadItems, loadItems } from './fetch.js';
import { showSuccess, showError } from './notification.js';
import { initMap, updateMap } from './map.js';

const ITEMS_QUANTITY = 10;
const ANY = 'any';

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
let messageTemplate = document.querySelector('#fetch_error').content;
const mapFilters = document.querySelector('.map__filters');

let ads = null;

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue;
  price.min = minValue;
};

const updateAddress = (lat, lng) => {
  address.value = `${lat} ${lng}`;
};

const updateCapacity = () => {
  let capacityChildren = capacity.children;

  for (let places of capacityChildren) {
    const roomsNumber = GUESTS_RESOURCE[`${rooms.value}`];

    places.removeAttribute('selected', 'selected');

    if (roomsNumber.includes(places.value)) {
      places.disabled = false;
      if (places.value == rooms.value) {
        places.setAttribute('selected', 'selected');
      }
    } else {
      places.disabled = true;
    }
  }
};

const initCapacityChange = () => {
  rooms.addEventListener('change', () => {
    updateCapacity();
  });
};

const initTypeChange = () => {
  type.addEventListener('change', () => {
    updatePrice();
  });
};

const onFormSumbit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    uploadItems(showSuccess, showError, new FormData(evt.target));
  });
};

const setDefaultFormValues = () => {
  form.reset();
  updateAddress(MAIN_COORDS.LAT, MAIN_COORDS.LNG);
};

const setDefaultPrice = () => {
  updatePrice();
};

const setDefaultCapacity = () => {
  updateCapacity();
};

const onResetButtonClick = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    setDefaultFormValues();
  });
};

const initTimeChange = () => {
  timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  });
};

const setPageActivity = (status) => {
  if (!status) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }
};

const getAds = () =>
  loadItems(
    (items) => {
      ads = items.slice(0, ITEMS_QUANTITY);

      initMap(ads);
    },
    (err) => {
      const messageЕemplateElement = messageTemplate.cloneNode(true);

      messageЕemplateElement.querySelector(
        '.fetch_error_message'
      ).innerText = err;

      document.body.prepend(messageЕemplateElement);
    }
  );

const onMapFiltersChange = () => {
  mapFilters.addEventListener('change', (evt) => {
    const filters = Object.fromEntries(new FormData(evt.currentTarget));

    const unflatened = unflatten(filters);

    const filtredAds = getFiltredAds(ads, unflatened, ITEMS_QUANTITY);
    updateMap(filtredAds);
  });
};

const checkValue = (adValue, filterValue) => {
  return filterValue === ANY || adValue === filterValue;
};

const checkPriceRange = (price, housingPrice) => {
  return (
    housingPrice === ANY ||
    (price >= PRICES_RANGE[housingPrice].MIN &&
      price <= PRICES_RANGE[housingPrice].MAX)
  );
};

const prepareValue = (stringValue) => {
  if (stringValue === ANY) {
    return stringValue;
  }

  return parseInt(stringValue);
};

const checkIntersection = (features, filters) => {
  // for (let i = 0; i < features.length; i++) {
  //   if (filters.indexOf(features[i]) == -1) return false;
  // }

  // return true;

  if (!filters) {
    // условие #1
    return true;
  }
  for (var i = 0; i < filters.length; i++) {
    for (var j = 0; j < features.length; j++) {
      if (filters[i] == features[j]) {
        // вообще есть indexOf, но непонятно, под какие платформы это пишется, так что по старинке
        break;
      }
      if (j === features.length - 1) {
        // мы дошли до конца массива, и так и не нашли вхождение - значит, у нас есть элемент, который не входит в where, и нужно вернуть false
        return false;
      }
    }
  }
  // ни для одного из элементов не сработал return false, а значит, все они найдены
  return true;
};

const getFiltersArray = (filterFeatures) =>
  filterFeatures === undefined ? undefined : Object.values(filterFeatures);

const filterAd = (ad, filters) => {
  const {
    offer: { type, rooms, guests, price, features },
  } = ad;

  const filtersArr = getFiltersArray(filters['features']);

  // const filtersArr = Object.values(filters['features']);

  const housingType = filters['housing-type'];
  const housingRooms = prepareValue(filters['housing-rooms']);
  const housingGuests = prepareValue(filters['housing-guests']);
  const housingPrice = filters['housing-price'];
  // const housingFeatures = filters['housing-features'];

  return (
    checkValue(type, housingType) &&
    checkValue(rooms, housingRooms) &&
    checkValue(guests, housingGuests) &&
    checkPriceRange(price, housingPrice) &&
    checkIntersection(features, filtersArr)
  );
};

const getFiltredAds = (ads, filters, count) => {
  const filtred = [];

  for (let i = 0; i < count; i++) {
    const ad = ads[i];
    const isAvaliable = filterAd(ad, filters);

    if (isAvaliable) {
      filtred.push(ad);
    }

    if (filtred.length === count) {
      break;
    }
  }

  return filtred;
};

const unflatten = (data) => {
  var result = {};
  for (var i in data) {
    var keys = i.split('.');
    keys.reduce(function (r, e, j) {
      return (
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 == j
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
};

const initForm = () => {
  setDefaultPrice();
  setDefaultCapacity();

  initTypeChange();
  initTimeChange();
  initCapacityChange();

  onFormSumbit();
  onResetButtonClick();

  onMapFiltersChange();
};

export {
  initForm,
  updateAddress,
  setDefaultFormValues,
  setPageActivity,
  getAds,
};
