import { createHouseDetails, getIcon } from './tags.js';
import { getPersonPhoto } from './image.js';

const houseInformation = document.querySelector('#house-information');
const housePrice = document.querySelector('#reserve div:nth-child(3) p:last-child strong');
let max_guest = 0;

function displayHouseTitle(house) {
  const title = document.querySelector('#house-description h1');
  const location = document.querySelector('#house-description h3 span');
  title.innerText = house.title;
  location.innerText = house.address;

  const img = document.querySelector('#house-title aside img');
  img.src = getPersonPhoto(house.owner.photo);
  const name = document.querySelector('#house-title aside span');
  name.innerText = house.owner.full_name;
}

export default function buildMainHouseInfo(house) {
  max_guest = house.max_guest_number;

  displayHouseTitle(house);

  housePrice.innerText = house.price_per_day;

  const description = houseInformation.querySelector('#description');
  const information = houseInformation.querySelector('aside');
  const reviews = houseInformation.querySelector('#reviews');
  const rating = reviews.querySelector('span > span > span:first-child');
  const numReviews = reviews.querySelector('span > span > span:last-child');
  const innerText = document.createElement('div');
  innerText.innerText = house.description;
  description.appendChild(innerText);

  const tags = document.createElement('div');
  createHouseDetails(tags, house);
  information.appendChild(tags);
  const comments = document.createElement('div');
  const pos = { lat: Number(house.latitude), lng: Number(house.longitude) };
  const maps = new google.maps.Map(document.querySelector('#google-maps'), {
    center: pos,
    zoom: 19
  });

  const marker = new google.maps.Marker({
    position: pos,
    map: maps
  });
  maps.panTo(pos);

  house.reviews.forEach(review => {
    const comment = document.createElement('article');
    const commentName = document.createElement('h4');
    commentName.innerText = review.full_name;
    const avatar = document.createElement('img');
    avatar.setAttribute('class', 'photo-avatar');
    avatar.src = getPersonPhoto(review.photo);
    const commentOwner = document.createElement('div');
    commentOwner.appendChild(avatar);
    commentOwner.appendChild(commentName);
    const commentText = document.createElement('p');
    commentText.innerText = review.comment;
    comment.appendChild(commentOwner);
    comment.appendChild(commentText);
    comments.appendChild(comment);
  });
  reviews.appendChild(comments);
  const ratingAvg = document.createElement('span');
  ratingAvg.innerText = house.rating;
  rating.appendChild(ratingAvg);
  rating.appendChild(getIcon('fa-star'));
  numReviews.innerText = `${house.reviews.length} Reviews`;
  return {
    maps: {
      maps,
      marker
    },
    house
  };
}
