import { setDefaultFormValues } from './form.js';

const main = document.querySelector('main');

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

let msgSuc = null;
let msgErr = null;

const showSuccess = () => {
  const successMessageTemplateElement = successMessageTemplate.cloneNode(true);

  main.prepend(successMessageTemplateElement);
  msgSuc = document.querySelector('.success');

  addDocumentEvents();
};

const showError = (err) => {
  const errorMessageTemplateElement = errorMessageTemplate.cloneNode(true);

  errorMessageTemplateElement.querySelector('.error__message').innerText = err;

  main.prepend(errorMessageTemplateElement);
  msgErr = document.querySelector('.error');

  addDocumentEvents();
};

const onDocumentClick = () => {
  hideNotification();
};

const onDocumentKeyDown = () => {
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
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
