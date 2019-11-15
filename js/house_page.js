'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags, getIcon } from './tags.js';

const urlParams = new URL(window.location).searchParams;

const houseInformation = document.querySelector('#house-information');

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

  const description = houseInformation.querySelector('#description');
  const information = houseInformation.querySelector('aside');
  const reviews = houseInformation.querySelector('#reviews');
  const rating = reviews.querySelector('span > span > span:first-child');
  const numReviews = reviews.querySelector('span > span > span:last-child');
  const innerText = document.createElement('div');
  innerText.innerText = house.description;
  description.appendChild(innerText);

  const tags = document.createElement('div');
  createHouseTags(tags, house);
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
}
