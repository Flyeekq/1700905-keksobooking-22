import { PRICES_RESOURCE, GUESTS_RESOURCE } from './data.js';
import { uploadItems } from './fetch.js';
import { showSuccess, showError } from './notification.js';

const MainCoord = {
  LAT: 35.672855,
  LNG: 139.817413,
};

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');

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

    // uploadItems(
    //   () => {
    //     showSuccess();
    //   },
    //   (err) => {
    //     showError(err);
    //   },
    //   new FormData(event.target)
    // );

    uploadItems(showSuccess, showError, new FormData(evt.target));
  });
};

const setDefaultFormValues = () => {
  form.reset();
  updateAddress(MainCoord.LAT, MainCoord.LNG);
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

const initForm = () => {
  setDefaultPrice();
  setDefaultCapacity();
  initTypeChange();
  initTimeChange();
  initCapacityChange();
  onFormSumbit();
  onResetButtonClick();
};

export { initForm, updateAddress, setDefaultFormValues };
