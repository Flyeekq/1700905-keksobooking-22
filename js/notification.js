import { setDefaultFormValues } from './form.js';

const main = document.querySelector('main');

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

let msgSuc = null;
let msgErr = null;

const showSuccess = () => {
  msgSuc = successMessageTemplate.querySelector('.success').cloneNode(true);

  main.prepend(msgSuc);

  addDocumentEvents();
};

const showError = (err) => {
  msgErr = errorMessageTemplate.querySelector('.error').cloneNode(true);
  msgErr.querySelector('.error__message').innerText = err;

  main.prepend(msgErr);

  addDocumentEvents();
};

const onDocumentClick = () => {
  hideNotification();
};

const onDocumentKeyDown = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 27) {
      hideNotification();
    }
  });
};

const addDocumentEvents = () => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const removeDocumentEvents = () => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const hideNotification = () => {
  if (msgSuc !== null) {
    main.removeChild(msgSuc);
    msgSuc = null;

    setDefaultFormValues();

    removeDocumentEvents();
  }
  if (msgErr !== null) {
    main.removeChild(msgErr);
    msgErr = null;

    removeDocumentEvents();
  }
};

export { showSuccess, showError };
