export function getPlacePhoto(photourl) {
  return `../assets/place_photos/eir_${photourl}.jpg`;
}

export function getPersonPhoto(photourl) {
  const photo = photourl ? photourl : 'unkwown';
  return `../assets/user_photos/eir_${photo}.jpg`;
}
