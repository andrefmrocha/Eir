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

  const results = await Promise.all(
    possibleCountries.map(async country => {
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
      return houses ? houses : [];
    })
  );
  return results.reduce((prev, curr) => prev.concat(curr));
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

  let results = [];

  deleteHouses();
  const prices = filters.getActivePriceRanges();
  if (prices.length > 0) {
    results = (
      await Promise.all(
        prices.map(
          async range =>
            await getHouses({
              ...params,
              ...getPriceRangeParameters(range)
            })
        )
      )
    ).reduce((prev, curr) => prev.concat(curr));
  } else {
    results = await getHouses({ ...params });
  }

  const sort = filters.getActiveHouseSort();
  results.sort(getSortKey(sort));
  addNewHouses(results);
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
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? -1 : h1.rating < h2.rating ? -1 : 1);
    case 'rating-highest':
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? 1 : h1.rating > h2.rating ? -1 : 1);
    case 'price-lowest':
      return (h1, h2) => (!h1.price_per_day ? -1 : h1.price_per_day < h2.price_per_day ? -1 : 1);
    case 'price-highest':
      return (h1, h2) => (!h1.price_per_day ? 1 : h1.price_per_day > h2.price_per_day ? -1 : 1);
    default:
      return (h1, h2) => -1;
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
