import renderCard from './layout.js';
import { updateAddress } from './form.js';
import { MAIN_COORDS } from './costs.js';
import { debounce } from './debounce.js';
import { initForm, setPageActivity } from './form.js';

const RERENDER_DELAY = 500;

let map = null;
let markerGroup = null;
let items = [];

const mainMarkerMoveendHandler = (evt) => {
  let markerLatLng = evt.target.getLatLng();
  const { lat, lng } = markerLatLng;

  updateAddress(lat, lng);
};

const renderMainMarker = () => {
  const mainPinIcon = createIcon('../img/main-pin.svg');

  const mainPinMarker = createMarker(
    MAIN_COORDS.LAT,
    MAIN_COORDS.LNG,
    mainPinIcon,
    mainMarkerMoveendHandler,
  );

  mainPinMarker.addTo(map);

  const { lat, lng } = mainPinMarker._latlng;

  updateAddress(lat, lng);
};

const renderMarkers = (items) => {
  items.forEach((item) => {
    const simplePinIcon = createIcon('../img/pin.svg');

    const simplePinMarker = createMarker(
      item.location.lat,
      item.location.lng,
      simplePinIcon,
    );

    simplePinMarker.bindPopup(renderCard(item), {
      keepInView: true,
    });

    simplePinMarker.addTo(markerGroup);
  });
};

const refreshMarkers = (filter) => {
  markerGroup.clearLayers();
  const displayItems = filter ? filter(items) : items;
  renderMarkers(displayItems);
}

const debounceUpdateMarkers = debounce(refreshMarkers, RERENDER_DELAY);

const createMap = () => {
  const map = window.L.map('map').on('load', () => {
    initForm();
    setPageActivity(true);
  }).setView(
    {
      lat: MAIN_COORDS.LAT,
      lng: MAIN_COORDS.LNG,
    },
    16);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  }).addTo(map);

  return map;
};

const createMarker = (lat, lng, icon, onMoveendHandler = null) => {
  let marker = window.L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: !!onMoveendHandler,
      icon: icon,
    },
  );

  if (onMoveendHandler) {
    marker.on('move', onMoveendHandler);
  }

  return marker;
};

const createIcon = (iconUrl) => {
  return window.L.icon({
    iconUrl: iconUrl,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
};

const initMap = (ads) => {
  map = createMap();
  markerGroup = window.L.layerGroup().addTo(map);
  items = ads;

  renderMainMarker();
  updateMarkers();
};

const updateMarkers = (filter) => {
  if (!map || !markerGroup) {
    return;
  }

  debounceUpdateMarkers(filter);
};

export { initMap, updateMarkers };
