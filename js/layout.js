import { TYPE_RESOURCE } from './costs.js';

const CLASS_TEXT = 'popup__feature--';

const cardTemplate = document.querySelector('#card').content;
const photosFragment = document.createDocumentFragment();
const defaultValues = [0, '', undefined, null, '0:00'];

const addFeatures = (container, features) => {
  container.textContent = '';

  features.forEach((feature) => {
    if (validateValue(feature)) {
      const featureElement = document.createElement('li');

      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`${CLASS_TEXT}${feature}`);
      featureElement.innerText = feature;

      container.appendChild(featureElement);
    }
  });
};

const addValues = (element, author, article) => {
  const {
    title,
    address,
    price,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    photos,
  } = element;

  const photosForm = article.querySelector('.popup__photos');
  const photoForm = photosForm.querySelector('.popup__photo');

  const photoTemplate = photoForm.cloneNode(true);

  const titleElement = article.querySelector('.popup__title');
  if (validateValue(title)) {
    titleElement.innerText = title;
  } else {
    titleElement.remove();
  }

  const addressElement = article.querySelector('.popup__text--address');
  if (validateValue(address)) {
    addressElement.innerText = address;
  } else {
    addressElement.remove();
  }

  const descriptionElement = article.querySelector('.popup__description');
  if (validateValue(description)) {
    descriptionElement.innerText = description;
  } else {
    descriptionElement.remove();
  }

  const priceElement = article.querySelector('.popup__text--price');
  if (validateValue(price)) {
    priceElement.innerText = `${price} ₽/ночь`;
  } else {
    priceElement.remove();
  }

  const capacityElement = article.querySelector('.popup__text--capacity');
  if (validateValue(rooms, guests)) {
    capacityElement.innerText = `${rooms} комнаты для ${guests} гостей`;
  } else {
    capacityElement.remove();
  }

  const time = article.querySelector('.popup__text--time');
  if (validateValue(checkin, checkout)) {
    time.innerText = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    time.remove();
  }

  const avatarElement = article.querySelector('.popup__avatar');
  if (validateValue(author.avatar)) {
    avatarElement.src = author.avatar;
  } else {
    avatarElement.remove();
  }

  photoForm.remove();

  photos.forEach((srcPhoto) => {
    if (validateValue(srcPhoto)) {
      const newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = srcPhoto;
      photosFragment.appendChild(newPhoto);
    }
  });

  if (photosFragment.children.length) {
    photosForm.appendChild(photosFragment);
  }
};

const validateValue = (...deps) => {
  const isInvalid = deps.reduce(
    (acc, deps) => acc && defaultValues.includes(deps),
    true
  );
  return !isInvalid;
};

const getCardTemplate = (item) => {
  const {
    offer,
    offer: { features, type },
    author,
  } = item;
  const cardTemplateElement = cardTemplate.cloneNode(true);

  const article = cardTemplateElement.querySelector('.popup');

  article.querySelector('.popup__type').innerText = TYPE_RESOURCE[type];

  const featuresContainer = article.querySelector('.popup__features');
  addFeatures(featuresContainer, features);

  addValues(offer, author, article);

  return cardTemplateElement;
};

const renderCard = (item) => {
  const cardItem = getCardTemplate(item);
  return cardItem;
};

export default renderCard;
