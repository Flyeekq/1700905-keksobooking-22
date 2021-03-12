import { PRICES_RESOURCE, GUESTS_RESOURCE } from './data.js';
import { uploadItems } from './fetch.js';

const main = document.querySelector('main');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');


let successMessageTemplate = document.querySelector('#success').content;
let errorMessageTemplate = document.querySelector('#error').content;
let errorMessageButton = document.querySelector('.error__button');


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
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    uploadItems(
      () => {
        const successMessageTemplateElement = successMessageTemplate.cloneNode(true);

        main.prepend(successMessageTemplateElement);

        initForm();
      },
      (err) => {
        const errorMessageTemplateElement = errorMessageTemplate.cloneNode(true);
        errorMessageTemplateElement.querySelector('.error__message').innerText = err;

        main.prepend(errorMessageTemplateElement);
      },
      new FormData(event.target),
    );
  });
};

const onResetButtonClick = () => {
  resetButton.addEventListener('click', () => {
    initForm();
  });
};

const onErrorButtonClick = () => {
  errorMessageButton.addEventListener('click', () => {
    initForm();
  });
};

const onDocumentClick = () => {

  document.addEventListener('click', (event) => {hideSuccessMsg(event.target);});
};

const onDocumentKeyDown = () => {
  document.addEventListener('keydown', (event) =>
  {
    if (event.keyCode == 27)
    {
      hideSuccessMsg(main);
    }
  });
}

const hideSuccessMsg = (target) => {
  const msgSuccess = document.querySelector('.success');

  if (target.contains(msgSuccess) && msgSuccess.style.display != 'none') {
    msgSuccess.style.display = 'none';
  }

}

const setDefaultPrice = () => {
  updatePrice();
};

const setDefaultCapacity = () => {
  updateCapacity();
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
  onErrorButtonClick
  onDocumentClick();
  onDocumentKeyDown();
};

export { initForm, updateAddress };
