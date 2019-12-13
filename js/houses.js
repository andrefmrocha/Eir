'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags } from './tags.js';
import { getPlacePhoto } from './image.js';
import * as filters from './filters.js';

export function generateHouseUrl(id) {
  return `${env.host}pages/house_page.php?id=${id}`;
}

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
        url: `${env.host}api/get_houses.php`,
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
              ...filters.getPriceRangeParameters(range)
            })
        )
      )
    ).reduce((prev, curr) => prev.concat(curr));
  } else {
    results = await getHouses({ ...params });
  }

  const sort = filters.getActiveHouseSort();
  const key = filters.getSortKey(sort);
  results.sort(key);
  addNewHouses(results);
}

function deleteHouses() {
  while (housesSection.firstChild) {
    housesSection.removeChild(housesSection.firstChild);
  }
}

function addNewHouses(houses) {
  console.log(houses);
  houses.forEach(house => {
    const article = document.createElement('article');
    const reference = document.createElement('a');
    reference.href = generateHouseUrl(house.id);
    const img = document.createElement('img');
    reference.appendChild(img);
    img.src = getPlacePhoto(house.photo);
    const houseDescription = document.createElement('div');
    const headerReference = document.createElement('a');
    headerReference.href = generateHouseUrl(house.id);
    const header = document.createElement('header');
    headerReference.appendChild(header);
    header.innerText = house.title;
    houseDescription.appendChild(headerReference);
    const houseCharateristics = document.createElement('div');
    createHouseTags(houseCharateristics, house);
    article.appendChild(reference);
    houseDescription.appendChild(houseCharateristics);
    article.appendChild(houseDescription);
    housesSection.appendChild(article);
  });
}

document.getElementsByClassName('button')[0].addEventListener('click', _ => {
  updateAllHouses();
});
