import {initMap} from './map.js';

const createFetch = (onSuccess, onError) => () => {
  return fetch(
    'https://22.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
};

const fetchAds = createFetch(
  (ads) => {
    initMap(ads);
  },
  (err) => {
    console.log(err);
  });

export {fetchAds};
