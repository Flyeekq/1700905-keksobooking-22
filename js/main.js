import {initForm} from './form.js';
import {setPageActivity} from './page.js';
import {fetchAds} from './fetch.js'

setPageActivity(false);

initForm();

setPageActivity(true);

fetchAds();
