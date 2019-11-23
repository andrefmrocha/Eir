'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseInformation, getIcon } from './tags.js';
import { getPhoto } from './image.js';

const urlParams = new URL(window.location).searchParams;

const houseInformation = document.querySelector('#house-information');

const carousel = document.querySelector('#photos-carousel');

const housesCarousel = {
  selected: 0,
  houses: []
};

getHouseInfo();

async function getHouseInfo() {
  const id = urlParams.get('id');
  const house = await request({
    url: `${env.host}/api/fetch_house.php`,
    method: 'GET',
    content: {
      id
    }
  });

  displayHouseTitle(house);

  const description = houseInformation.querySelector('#description');
  const information = houseInformation.querySelector('aside');
  const reviews = houseInformation.querySelector('#reviews');
  const rating = reviews.querySelector('span > span > span:first-child');
  const numReviews = reviews.querySelector('span > span > span:last-child');
  const innerText = document.createElement('div');
  innerText.innerText = house.description;
  description.appendChild(innerText);

  const tags = document.createElement('div');
  createHouseInformation(tags, house);
  information.appendChild(tags);
  const comments = document.createElement('div');

  house.reviews.forEach(review => {
    const comment = document.createElement('div');
    comment.innerText = review.comment;
    comments.appendChild(comment);
  });
  reviews.appendChild(comments);
  const sum = house.reviews.reduce((acc, value) => Number(acc.rating) + Number(value.rating));
  const ratingAvg = document.createElement('span');
  ratingAvg.innerText = sum / house.reviews.length;
  rating.appendChild(ratingAvg);
  rating.appendChild(getIcon('fa-star'));
  numReviews.innerText = `${house.reviews.length} Reviews`;
  buildCarousel(house);
}

function buildCarousel(house) {
  housesCarousel.houses = house.photos.map((photo) => {
    const imageSel = document.createElement('img');
    imageSel.src = getPhoto(photo);
    return imageSel;
  });

  displayNewCarousel();
}

function displayNewCarousel() {
  removeCarouselData();
  const image = document.createElement('img');
  image.setAttribute('class', 'active');
  image.src = housesCarousel.houses[housesCarousel.selected].src;
  carousel.appendChild(image);
  const row = document.createElement('div');
  housesCarousel.houses.forEach((house, index) => {
    if (index === housesCarousel.selected) house.setAttribute('class', 'selected');
    row.appendChild(house);
  });
  carousel.appendChild(row);
}

function removeCarouselData() {
  while (carousel.firstElementChild) {
    carousel.removeChild(carousel.firstElementChild);
  }
}

document.querySelector('.fa-arrow-left').addEventListener('click', () => {
  housesCarousel.houses[housesCarousel.selected].removeAttribute('class');
  const nextSelection = housesCarousel.selected - 1;
  housesCarousel.selected = nextSelection < 0 ? housesCarousel.houses.length - 1 : nextSelection;
  displayNewCarousel();
});

document.querySelector('.fa-arrow-right').addEventListener('click', () => {
  housesCarousel.houses[housesCarousel.selected].removeAttribute('class');
  const nextSelection = ++housesCarousel.selected % housesCarousel.houses.length;
  housesCarousel.selected = nextSelection;
  displayNewCarousel();
});


function displayHouseTitle(house){
  const title = document.querySelector('#house-description h1');
  const location = document.querySelector('#house-description h3 span');
  title.innerText = house.title;
  location.innerText = house.name;
}
