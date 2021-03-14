const ErrorCodes = {
  MIN: 400,
  MAX: 600,
};

const createFetch = (url, options) => {
  return fetch(url, options).then((response) => {
    if (response.status >= ErrorCodes.MIN && response.status < ErrorCodes.MAX) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

const loadItems = (onSuccess, onError) => {
  createFetch('https://22.javascript.pages.academy/keksobooking/data', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
};

const uploadItems = (onSuccess, onError, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      onSuccess();
    })
    .catch((err) => {
      onError(err);
    });
};

export { loadItems, uploadItems };
