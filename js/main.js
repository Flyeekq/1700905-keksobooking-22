import {initForm} from './form.js';
import {setPageActivity} from './page.js';
import {loadItems} from './fetch.js'
import {initMap} from './map.js'

let messageTemplate = document.querySelector('#fetch_error').content;

setPageActivity(false);

initForm();

setPageActivity(true);

loadItems((items) => {
  initMap(items);
},
(err) => {

  const messageЕemplateElement = messageTemplate.cloneNode(true);

  messageЕemplateElement.querySelector('.fetch_error_message').innerText = err;

  document.body.prepend(messageЕemplateElement);

});


