import {
  PRICES_RESOURCE,
  GUESTS_RESOURCE,
  MAIN_COORDS,
  PRICES_RANGE
} from './costs.js';
import { uploadItems } from './fetch.js';
import { showSuccess, showError } from './notification.js';
import { updateMarkers } from './map.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ITEMS_QUANTITY = 10;
const ADDRESS_PRECISION = 5;
const ANY = 'any';
const IMG_DEFAULT = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector(
  '.ad-form__field input[type=file]',
);
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileChooserAdPhoto = document.querySelector(
  '.ad-form__upload input[type=file]',
);
const previewAdPhoto = document.querySelector('.ad-form__photo img');

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const housingFeatures = mapFilters.querySelector('#housing-features');

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue;
  price.min = minValue;
};

const updateAddress = (lat, lng) => {
  address.value = `${lat.toFixed(ADDRESS_PRECISION)} ${lng.toFixed(ADDRESS_PRECISION)}`;
};

const updateImg = () => {
  previewAvatar.src = IMG_DEFAULT;
  previewAdPhoto.src = IMG_DEFAULT;
};

const updateCapacity = () => {
  let capacityChildren = capacity.children;

  for (let places of capacityChildren) {
    const roomsNumber = GUESTS_RESOURCE[`${rooms.value}`];

    places.removeAttribute('selected', 'selected');

    if (roomsNumber.includes(places.value)) {
      places.disabled = false;
      if (places.value === rooms.value) {
        places.setAttribute('selected', 'selected');
      }
    } else {
      places.disabled = true;
    }
  }
};

const initAvatarChange = () => {
  fileChooserAvatar.addEventListener('change', () => {
    changeImgPreview(fileChooserAvatar, previewAvatar);
  });
};

const initAdPhotoChange = () => {
  fileChooserAdPhoto.addEventListener('change', () => {
    changeImgPreview(fileChooserAdPhoto, previewAdPhoto);
  });
};

const changeImgPreview = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
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

    uploadItems(showSuccess, showError, new FormData(form));
  });
};

const setDefaultFormValues = () => {
  form.reset();
  mapFilters.reset();
  updateAddress(MAIN_COORDS.LAT, MAIN_COORDS.LNG);
  updateImg();
  updatePrice();
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

const onMapFiltersChange = () => {
  mapFilters.addEventListener('change', () => {
    updateMapFilters();
  });
};

const updateMapFilters = () =>{
  const filters = Object.fromEntries(new FormData(mapFilters));

  const unflatened = unflatten(filters);

  updateMarkers((items) => {
    return getFiltredAds(items, unflatened, ITEMS_QUANTITY);
  });
}


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

const checkMatchFeatures = (features, filters) => {
  if (!filters.length) {
    return true;
  }

  return filters.every((feature) => features.includes(feature));
};

const getArrayFeatures = () => {
  const features = housingFeatures.querySelectorAll(
    'input[type = checkbox]:checked',
  );
  return Array.from(features).map((feature) => feature.value);
};

const filterAd = (ad, filters) => {
  const {
    offer: { type, rooms, guests, price, features },
  } = ad;

  const filtersArr = getArrayFeatures();

  const housingType = filters['housing-type'];
  const housingRooms = prepareValue(filters['housing-rooms']);
  const housingGuests = prepareValue(filters['housing-guests']);
  const housingPrice = filters['housing-price'];

  return (
    checkValue(type, housingType) &&
    checkValue(rooms, housingRooms) &&
    checkValue(guests, housingGuests) &&
    checkPriceRange(price, housingPrice) &&
    checkMatchFeatures(features, filtersArr)
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
  let result = {};
  for (let i in data) {
    let keys = i.split('.');
    keys.reduce(function (r, e, j) {
      return (
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 === j
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
};

const initForm = () => {
  setDefaultFormValues();
  setDefaultPrice();
  setDefaultCapacity();

  initAvatarChange();
  initAdPhotoChange();

  initTypeChange();
  initTimeChange();
  initCapacityChange();

  onFormSumbit();
  onResetButtonClick();

  updateMapFilters();

  onMapFiltersChange();
};

export { initForm, updateAddress, setDefaultFormValues, setPageActivity };
