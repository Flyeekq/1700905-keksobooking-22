function fillingAds(templateObjects) {
  const MAP = document.querySelector('#map-canvas');

  for (const i in templateObjects) {
    if (Object.hasOwnProperty.call(templateObjects, i)) {
      const ad = templateObjects[i];
      const element = ad.offer;

      let cardTemplate = document.querySelector('#card').content;
      let offer = cardTemplate.cloneNode(true);
      let article = offer.children[0];

      let type = article.querySelector('.popup__type');
      let features = article.querySelector('.popup__features');
      features.textContent = '';

      addingValues(ad, element, article)
      addingHousingTypes(type, element.type);
      addingFeatures(features, element.features);

      //For now I display one last declaration in the # map-canvas, according to the condition of the task, then I will remove the (if)
      if (i == templateObjects.length-1) {
        MAP.appendChild(offer);
      }

    }
  }
}

function addingValues(ad, element, article) {

  let title = article.querySelector('.popup__title');
  let address = article.querySelector('.popup__text--address');
  let price = article.querySelector('.popup__text--price');
  let guestRooms = article.querySelector('.popup__text--capacity');
  let timeInOut = article.querySelector('.popup__text--time');
  let description = article.querySelector('.popup__description');
  let photos = article.querySelector('.popup__photos').querySelector('.popup__photo');
  let avatar = article.querySelector('.popup__avatar');

  title.innerText = element.title;
  address.innerText = element.address;
  price.innerText = `${element.price} ₽/ночь`;
  guestRooms.innerText = `${element.rooms} комнаты для ${element.guests} гостей`;
  timeInOut.innerText = `Заезд после ${element.checkin}, выезд до ${element.checkout}`;
  description.innerText = element.description;
  photos.src = element.photos;
  avatar.src = ad.autor.avatar;
}

function addingHousingTypes(type, elementType) {
  switch (elementType) {
    case 'flat':
      type.innerText = 'Квартира';
      break;
    case 'bungalow':
      type.innerText = 'Бунгало';
      break;
    case 'house':
      type.innerText = 'Дом';
      break;
    case 'palace':
      type.innerText = 'Дворец';
      break;
    default:
      type.innerText = '';
  }
}

function addingFeatures(features, elementFeatures) {
  const CLASSTEXT = 'popup__feature--';

  for (const featureElement of elementFeatures) {
    let feature = document.createElement('li');

    feature.classList.add('popup__feature');
    feature.classList.add(`${CLASSTEXT}${featureElement}`);
    feature.innerText = featureElement;

    features.appendChild(feature);
  }
}

export {fillingAds};
