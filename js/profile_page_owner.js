import carousel from './carousel.js';
import { getPlacePhoto } from './image.js';
import { request } from './network.js';
import env from './env.js';
import { generateHouseUrl } from './houses.js';

export function tintProfileLeaves() {
  const leaves = document.querySelectorAll('.profile-leaf');
  leaves.forEach(node => node.setAttribute('src', `${env.host}assets/gold-profile-leaf.svg`));
}

export async function getOwnProperties() {
  addAddPropertyButton();
  const houses = await request({
    url: `${env.host}api/get_properties.php`,
    method: 'GET',
    content: {}
  });

  const left = document.querySelector('.fa-chevron-left');
  const right = document.querySelector('.fa-chevron-right');
  document.querySelector('#profile-carrousel > h3').innerText = 'Properties';

  if (!houses.length || houses.length < 1) {
    left.remove();
    right.remove();
    return;
  }

  const housesNode = document.querySelector('#profile-carrousel > div > p');
  carousel.photos = houses.map(buildProperty);
  carousel.buildCarousel(housesNode);

  if (houses.length > 2) {
    left.addEventListener('click', () => carousel.previous(housesNode));
    right.addEventListener('click', () => carousel.next(housesNode));
    carousel.buildCarousel(housesNode);
    carousel.photos = houses.map(buildProperty);
  } else if (houses.length > 1) {
    left.remove();
    right.remove();
    carousel.buildCarousel(housesNode);
    carousel.photos = houses.map(buildProperty);
  }
}

function buildProperty(property) {
  const imgReference = document.createElement('a');
  imgReference.href = generateHouseUrl(property.id);
  const image = document.createElement('img');
  imgReference.appendChild(image);
  image.src = getPlacePhoto(property.photo);
  const wrapper = document.createElement('span');
  wrapper.appendChild(imgReference);
  const title = document.createElement('p');
  const titleWrapper = document.createElement('a');
  titleWrapper.href = generateHouseUrl(property.id);
  titleWrapper.appendChild(title);
  title.innerText = property.title;
  const stays = document.createElement('p');
  if (property.upcomingStays == 1) {
    stays.innerText = '1 upcoming stay';
  } else {
    stays.innerText = `${property.upcomingStays} upcoming stays`;
  }
  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(stays);
  return wrapper;
}

function addAddPropertyButton() {
  const addPropertyButton = document.createElement('a');
  addPropertyButton.href = `${env.host}pages/create_house.php`;
  addPropertyButton.innerText = 'Add Property';
  addPropertyButton.setAttribute('class', 'button');
  const carrouselNode = document.querySelector('#profile-carrousel');
  carrouselNode.appendChild(addPropertyButton);
}
