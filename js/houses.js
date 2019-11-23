'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags } from './tags.js';
import { getPhoto } from './image.js'

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
    const img = document.createElement('img');
    img.src = getPhoto(house.photo);
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
