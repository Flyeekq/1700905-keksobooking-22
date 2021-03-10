import {TYPE_RESOURCE} from './data.js';

const CLASS_TEXT = 'popup__feature--';

const cardTemplate = document.querySelector('#card').content;

const addFeatures = (container, features) => {
  container.textContent = '';

  features.forEach((feature) => {
    const featureElement = document.createElement('li');

    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`${CLASS_TEXT}${feature}`);
    featureElement.innerText = feature;

    container.appendChild(featureElement);
  });
}

const addValues = (element, autor, article) => {

  const {title, address, price, rooms, guests, checkin, checkout, description, photos} = element;

  article.querySelector('.popup__title').innerText = title;
  article.querySelector('.popup__text--address').innerText = address;
  article.querySelector('.popup__text--price').innerText = `${price} ₽/ночь`;
  article.querySelector('.popup__text--capacity').innerText = `${rooms} комнаты для ${guests} гостей`;
  article.querySelector('.popup__text--time').innerText = `Заезд после ${checkin}, выезд до ${checkout}`;
  article.querySelector('.popup__description').innerText = description;
  article.querySelector('.popup__photos').querySelector('.popup__photo').src = photos;
  article.querySelector('.popup__avatar').src = autor.avatar;
}

const getCardTemplate = (item) => {
  const {offer, offer:{features, type}, autor} = item;
  const cardTemplateElement = cardTemplate.cloneNode(true);

  const article = cardTemplateElement.querySelector('.popup');

  article.querySelector('.popup__type').innerText = TYPE_RESOURCE[type];

  const featuresContainer = article.querySelector('.popup__features');
  addFeatures(featuresContainer, features);

  addValues(offer,autor, article);

  return cardTemplateElement;
};

const renderCard = (item) => {
  const cardItem = getCardTemplate(item);
  return cardItem;
};

export default renderCard;
