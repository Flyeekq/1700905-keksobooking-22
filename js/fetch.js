const createFetch = (url, options) => {
  return fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  });
}

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
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
    })
    .catch((err) => {
      onError(err);
    });
};


export {loadItems, uploadItems};
