import carousel from './carousel.js';
import { getPlacePhoto } from './image.js';
import { request } from './network.js';
import env from './env.js';
import { generateHouseUrl } from './houses.js';

export default async function getRentalHistory() {
  const houses = await request({
    url: `${env.host}api/get_rental_history.php`,
    method: 'GET',
    content: {}
  });

  const housesNode = document.querySelector('#profile-carrousel > div > p');
  const left = document.querySelector('.fa-chevron-left');
  const right = document.querySelector('.fa-chevron-right');
  document.querySelector('#profile-carrousel > h3').innerText = 'History';


  if (houses.length > 2) {
    left.addEventListener('click', () => carousel.previous(housesNode));
    right.addEventListener('click', () => carousel.next(housesNode));
    carousel.photos = houses.map(buildHouse);
    carousel.buildCarousel(housesNode);
  } else if (houses.length > 1) {
    left.remove();
    right.remove();
    carousel.photos = houses.map(buildHouse);
    carousel.buildCarousel(housesNode);
  } else {
    left.remove();
    right.remove();
  }
}

function buildHouse(house) {
  const imgReference = document.createElement('a');
  imgReference.href = generateHouseUrl(house.id);
  const image = document.createElement('img');
  imgReference.appendChild(image);
  image.src = getPlacePhoto(house.photo);
  const wrapper = document.createElement('span');
  wrapper.appendChild(imgReference);
  const title = document.createElement('p');
  const titleWrapper = document.createElement('a');
  titleWrapper.href = generateHouseUrl(house.id);
  titleWrapper.appendChild(title);
  title.innerText = house.title;
  const dates = document.createElement('p');
  dates.innerHTML = `Between <strong> ${house.checkin} </strong> and <strong> ${house.checkout} </strong>`;
  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(dates);
  return wrapper;
}
