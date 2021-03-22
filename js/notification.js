import { setDefaultFormValues } from './form.js';

const ESC = 'Escape';
const main = document.querySelector('main');

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const messageTemplate = document.querySelector('#fetch_error').content;

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

const showFetchError = (err) => {
  const messageTemplateElement = messageTemplate.cloneNode(true);
  messageTemplateElement.querySelector('.fetch_error_message').innerText = err;
  document.body.prepend(messageTemplateElement);
};

const onDocumentClick = () => {
  hideNotification();
};

const onDocumentKeyDown = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === ESC) {
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
    msgSuc.remove();

    msgSuc = null;

    setDefaultFormValues();

    removeDocumentEvents();
  }
  if (msgErr !== null) {
    msgSuc.remove();
    msgErr = null;

    removeDocumentEvents();
  }
};

export { showSuccess, showError, showFetchError };
