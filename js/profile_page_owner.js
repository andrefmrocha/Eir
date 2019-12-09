import carousel from './carousel.js';
import { getPlacePhoto } from './image.js';
import { request } from './network.js';
import env from './env.js';

export default async function getOwnProperties() {
  const houses = await request({
    url: `${env.host}api/get_properties.php`,
    method: 'GET',
    content: {}
  });

  document.querySelector('#profile-carrousel > h3').innerText = 'Properties';
  const housesNode = document.querySelector('#profile-carrousel > div > p');

  carousel.photos = houses.map(buildProperty);
  carousel.buildCarousel(housesNode);

  const left = document.querySelector('.fa-chevron-left');
  const right = document.querySelector('.fa-chevron-right');

  if (houses.length > 2) {
    left.addEventListener('click', () => carousel.previous(housesNode));
    right.addEventListener('click', () => carousel.next(housesNode));
  } else {
    left.remove();
    right.remove();
  }
}

function buildProperty(property) {
  const image = document.createElement('img');
  image.src = getPlacePhoto(property.photo);
  const wrapper = document.createElement('span');
  wrapper.appendChild(image);
  const title = document.createElement('p');
  title.innerText = property.title;
  const stays = document.createElement('p');
  if (property.upcomingStays == 1) {
    stays.innerText = '1 upcoming stay';
  } else {
    stays.innerText = `${property.upcomingStays} upcoming stays`;
  }
  wrapper.appendChild(title);
  wrapper.appendChild(stays);
  return wrapper;
}
