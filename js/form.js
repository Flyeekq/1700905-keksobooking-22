import {
  PRICES_RESOURCE,
  GUESTS_RESOURCE,
  MAIN_COORDS,
  PRICES_RANGE,
} from './data.js';
import { uploadItems, loadItems } from './fetch.js';
import { showSuccess, showError } from './notification.js';
import { initMap } from './map.js';

const ITEMS_QUANTITY = 10;

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
    let filters = Object.fromEntries(new FormData(evt.currentTarget));
    console.log(filters);
    filterAds(ads, filters);
  });
};

const filterAds = (ads, filters) => {
  let newAds = ads.filter((ad) => {
    if (
      filters['housing-type'] !== 'any' &&
      ad.offer.type != filters['housing-type']
    ) {
      return false;
    }

    if (
      filters['housing-rooms'] !== 'any' &&
      ad.offer.rooms != filters['housing-rooms']
    ) {
      return false;
    }

    if (
      filters['housing-guests'] !== 'any' &&
      ad.offer.guests != filters['housing-guests']
    ) {
      return false;
    }

    if (
      filters['housing-price'] !== 'any' &&
      (ad.offer.price < PRICES_RANGE[filters['housing-price']].MIN ||
        ad.offer.price > PRICES_RANGE[filters['housing-price']].MAX)
    ) {
      return false;
    }

    return true;
  });

  console.log(newAds);

  initMap(newAds, true);
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
