import { PRICES_RESOURCE } from './data.js';
import renderCard from './layout.js';
import createObjects from './util.js';

const OBJECT_QUANTITY = 10;

const templateObjects = new Array(OBJECT_QUANTITY).fill(null).map(() => createObjects());

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const address = document.querySelector('#address');

const updatePrice = () => {
  const minValue = PRICES_RESOURCE[`${type.value}`];
  price.placeholder = minValue
  price.min = minValue;
}

const initTypeChange = () => {
  type.addEventListener('change', () => {
    updatePrice();
  })
}

const setDefaultPrice = () => {
  updatePrice();
}

const initTimeChange = () => {
  timeIn.addEventListener('change', () => { timeOut.value = timeIn.value; })
  timeOut.addEventListener('change', () => { timeIn.value = timeOut.value; })
}

const renderMap = () => {
  const map = L.map('map')
    .setView({
      lat: 35.672855,
      lng: 139.817413,
    }, 16);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.672855,
      lng: 139.817413,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    let markerLatLng = evt.target.getLatLng();
    address.value = `${markerLatLng.lat} ${markerLatLng.lng}`;
  });

  templateObjects.forEach((card) => {
    const simplePinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const simplePinMarker = L.marker(
      {
        lat: card.location.x,
        lng: card.location.y,
      },
      {
        draggable: true,
        icon: simplePinIcon,
      },
    );

    simplePinMarker.addTo(map)
      .bindPopup(
        renderCard(card),
        {
          keepInView: true,
        },
      );
  });

  address.value = `${mainPinMarker._latlng.lat} ${mainPinMarker._latlng.lng}`;
}

const initForm = () => {
  setDefaultPrice();
  initTypeChange();
  initTimeChange();
  renderMap();
}

export { initForm };
