export function getHouseLocation(coordinates, func) {
  const coords = {
    lat: coordinates.internalPosition.lat(),
    lng: coordinates.internalPosition.lng()
  };
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ location: coords }, (results, status) => {
    if (status === 'OK') {
      const city = results[0].address_components.find(component => component.types.indexOf('locality') != -1)
        .short_name;

      const region = results[0].address_components.find(component =>
        component.types.find(type => type.search('administrative_area') != -1)
      ).short_name;

      const country = results[0].address_components.find(component => component.types.indexOf('country') != -1)
        .short_name;

      const location = {
        coords,
        city,
        region,
        country,
        address: results[0].formatted_address
      };

      func(location);
    }
    return {
      coords
    };
  });
}
