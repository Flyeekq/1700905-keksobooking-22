import { setPageActivity } from './form.js';
import { loadItems } from './fetch.js';
import { initMap } from './map.js';
import { showFetchError } from './notification.js';


setPageActivity(false);

const getAds = () =>
  loadItems(
    (items) => {

      initMap(items);

    },
    (err) => {
      showFetchError(err);
    },
  );

getAds();
