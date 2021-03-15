import renderCard from './layout.js';
import { updateAddress } from './form.js';
import { MAIN_COORDS } from './data.js';

let markerGroup = null;

const renderMap = (ads, clearMarkers) => {
  if (clearMarkers) {
    markerGroup.clearLayers();
  } else {
    const map = createMap();
  }

  const mainPinIcon = createIcon('../img/main-pin.svg');

  let mainPinMarker = addMarker(
    MAIN_COORDS.LAT,
    MAIN_COORDS.LNG,
    true,
    mainPinIcon,
    map
  );
  const { lat, lng } = mainPinMarker._latlng;

  updateAddress(lat, lng);

  ads.forEach((card) => {
    const simplePinIcon = createIcon('../img/pin.svg');

    let simplePinMarker = addMarker(
      card.location.lat,
      card.location.lng,
      false,
      simplePinIcon,
      map
    );

    simplePinMarker.bindPopup(renderCard(card), {
      keepInView: true,
    });
  });
};

const createMap = () => {
  const map = L.map('map').setView(
    {
      lat: MAIN_COORDS.LAT,
      lng: MAIN_COORDS.LNG,
    },
    16
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  }).addTo(map);

  markerGroup = L.layerGroup().addTo(map);

  return map;
};

const addMarker = (lat, lng, onMoveendHandler, icon, map) => {
  let marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: onMoveendHandler,
      icon: icon,
    }
  );

  if (onMoveendHandler) {
    marker.on('moveend', (evt) => {
      let markerLatLng = evt.target.getLatLng();
      const { lat, lng } = markerLatLng;

      updateAddress(lat, lng);
    });
  }

  marker.addTo(markerGroup);

  return marker;
};

const createIcon = (iconUrl) => {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
};

const initMap = (ads, clearMarkers = false) => {
  renderMap(ads, clearMarkers);
};

export { initMap };
