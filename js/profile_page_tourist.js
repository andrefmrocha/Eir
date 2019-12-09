import carousel from './carousel.js';
import { getPlacePhoto } from './image.js';
import { request } from './network.js';
import env from './env.js';

export default async function getRentalHistory() {
  const houses = await request({
    url: `${env.host}api/get_rental_history.php`,
    method: 'GET',
    content: {}
  });

  document.querySelector('#profile-carrousel > h3').innerText = 'History';
  const housesNode = document.querySelector('#profile-carrousel > div > p');

  carousel.photos = houses.map(buildHouse);
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

function buildHouse(house) {
  const image = document.createElement('img');
  image.src = getPlacePhoto(house.photo);
  const wrapper = document.createElement('span');
  wrapper.appendChild(image);
  const title = document.createElement('p');
  title.innerText = house.title;
  const dates = document.createElement('p');
  dates.innerHTML = `Between <strong> ${house.checkin} </strong> and <strong> ${house.checkout} </strong>`;
  wrapper.appendChild(title);
  wrapper.appendChild(dates);
  return wrapper;
}
