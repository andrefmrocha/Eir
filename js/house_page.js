'use strict';

import { request } from './network.js';
import env from './env.js';
import { createHouseTags } from './tags.js';

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

  const description = houseInformation.querySelector('article');
  const information = houseInformation.querySelector('aside');
  const innerText = document.createElement('div');
  innerText.innerText = house.description;
  description.appendChild(innerText);

  const tags = document.createElement('div');
  createHouseTags(tags, house);
  information.appendChild(tags);
  console.log(house);
}
