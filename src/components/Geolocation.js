import React, { useEffect } from 'react';
import Geocode from 'react-geocode';

function Geolocation() {
  // useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('Latitude is :', position.coords.latitude);
    console.log('Longitude is :', position.coords.longitude);
    // ReverseGeocoding(position.coords.latitude, position.coords.longitude);
  });

  return;
}

function ReverseGeocoding(lat, lng) {
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey('API_KEY');

  // set response language. Defaults to english.
  Geocode.setLanguage('en');

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion('np');

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  // Get address from latidude & longitude.
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    (error) => {
      console.error(error);
    },
  );
}

export default Geolocation;
