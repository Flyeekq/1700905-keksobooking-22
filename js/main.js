import { initForm, setPageActivity } from './form.js';
import { loadItems } from './fetch.js';
import { initMap } from './map.js';
import { showFetchError } from './notification.js';

const ITEMS_QUANTITY = 10;

let ads = null;

setPageActivity(false);

const getAds = () =>
  loadItems(
    (items) => {
      ads = items.slice(0, ITEMS_QUANTITY);

      initMap(ads);
    },
    (err) => {
      showFetchError(err);
    }
  );

getAds();
