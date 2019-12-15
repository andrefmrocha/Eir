'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags } from './tags.js';
import { getPlacePhoto } from './image.js';

export function generateHouseUrl(id) {
  return `${env.host}pages/house_page.php?id=${id}`;
}

const urlParams = new URL(window.location).searchParams;

getAllHouses();

async function getAllHouses() {
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
      country: country.alpha2Code
    };
    const houses = await request({
      url: `${env.host}/api/get_houses.php`,
      method: 'POST',
      content
    });
    addNewHouses(houses);
  });
}

const housesSection = document.querySelector('#houses');

function addNewHouses(houses) {
  houses.forEach(house => {
    const article = document.createElement('article');
    const reference = document.createElement('a');
    reference.href = generateHouseUrl(house.id);
    const img = document.createElement('img');
    reference.appendChild(img);
    img.src = getPlacePhoto(house.photo);
    img.alt = 'House images';
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
