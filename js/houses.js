'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags } from './tags.js';
import { getPlacePhoto } from './image.js';
import * as filters from './filters.js';

const urlParams = new URL(window.location).searchParams;
const housesSection = document.querySelector('#houses');

updateAllHouses();

async function getHouses(extraParams) {
  const country = urlParams.get('country');
  const city = urlParams.get('city');
  const checkin = urlParams.get('checkin');
  const checkout = urlParams.get('checkout');
  const people = urlParams.get('people');
  const possibleCountries = await request({
    url: `https://restcountries.eu/rest/v2/name/${country}`,
    method: 'GET',
    content: {}
  });

  possibleCountries.forEach(async country => {
    const content = {
      city,
      checkin,
      checkout,
      people,
      country: country.alpha2Code,
      ...extraParams
    };
    const houses = await request({
      url: `${env.host}/api/get_houses.php`,
      method: 'POST',
      content
    });
    if (houses) addNewHouses(houses);
  });
}

async function updateAllHouses() {
  const params = {
    type: filters.getActiveHouseTypes().join(','),
    rating: filters.getActiveHouseRatings().join(','),
    filters: filters.getActiveHouseTags().join(',')
  };

  Object.keys(params).forEach(key => {
    if (params[key] == '') delete params[key];
  });

  deleteHouses();
  const prices = filters.getActivePriceRanges();
  if (prices.length > 0) {
    prices.forEach(async range =>
      getHouses({
        ...params,
        ...getPriceRangeParameters(range)
      })
    );
  } else {
    getHouses({ ...params });
  }
}

function getPriceRangeParameters(range) {
  switch (range) {
    case '0-50':
      return { max_price: 50 };
    case '50-100':
      return { min_price: 50, max_price: 100 };
    case '100-150':
      return { min_price: 100, max_price: 150 };
    case '150-200':
      return { min_price: 150, max_price: 200 };
    case '200-250':
      return { min_price: 200, max_price: 250 };
    case '250-plus':
      return { min_price: 250 };
    default:
      return {};
  }
}

function getSortKey(sort) {
  switch (sort) {
    case 'rating-lowest':
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? h1 : h1.rating < h2.rating ? h1 : h2);
    case 'rating-highest':
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? h2 : h1.rating > h2.rating ? h1 : h2);
    case 'price-lowest':
      return (h1, h2) => (!h1.price ? h1 : h1.price < h2.price ? h1 : h2);
    case 'price-highest':
      return (h1, h2) => (!h1.price ? h2 : h1.price > h2.price ? h1 : h2);
    default:
      return (h1, h2) => h1;
  }
}

function deleteHouses() {
  while (housesSection.firstChild) {
    housesSection.removeChild(housesSection.firstChild);
  }
}

function addNewHouses(houses) {
  houses.forEach(house => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = getPlacePhoto(house.photo);
    const houseDescription = document.createElement('div');
    const header = document.createElement('header');
    header.innerText = house.title;
    houseDescription.appendChild(header);
    const houseCharateristics = document.createElement('div');
    createHouseTags(houseCharateristics, house);
    article.appendChild(img);
    houseDescription.appendChild(houseCharateristics);
    article.appendChild(houseDescription);
    housesSection.appendChild(article);
  });
}

document.getElementsByClassName('button')[0].addEventListener('click', _ => {
  updateAllHouses();
});
