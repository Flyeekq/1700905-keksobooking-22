import renderCard from './layout.js';

const address = document.querySelector('#address');

const renderMap = (templateObjects) => {
  const map = createMap();

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  let mainPinMarker = addMarker(35.672855, 139.817413, true, mainPinIcon, map);
  updateAddress(address, mainPinMarker);

  templateObjects.forEach((card) => {
    const simplePinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    let simplePinMarker = addMarker(card.location.x, card.location.y, false, simplePinIcon, map);

    simplePinMarker.bindPopup(
      renderCard(card),
      {
        keepInView: true,
      },
    );
  });

}

const createMap = () => {
  const map = L.map('map').setView(
    {
      lat: 35.672855,
      lng: 139.817413,
    },
    16,
  );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

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
    },
  );

  if(onMoveendHandler){
    marker.on('moveend', (evt) => {
      let markerLatLng = evt.target.getLatLng();
      address.value = `${markerLatLng.lat} ${markerLatLng.lng}`;
    });
  }
  marker.addTo(map);

  return marker;
}

const updateAddress = (address, mainPinMarker) =>{
  address.value = `${mainPinMarker._latlng.lat} ${mainPinMarker._latlng.lng}`;
}

const initMap = (templateObjects) => {
  renderMap(templateObjects);
}

export { initMap };
