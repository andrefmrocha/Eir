'use strict';

import { request } from './network.js';
import env from './env.js';
import { getPlacePhoto } from './image.js';
import { showError, removeError } from './form_validation.js';
import { buildCalendar, validateDate } from './calendar.js';
import buildMainHouseInfo from './house_helper_functions.js'

const carousel = document.querySelector('#photos-carousel');
const housePrice = document.querySelector('#reserve div:nth-child(3) p:last-child strong');
const totalPrice = document.querySelector('#reserve div:nth-child(3) p:first-child strong');
const urlParams = new URL(window.location).searchParams;


const housesCarousel = {
  selected: 0,
  houses: []
};

let max_guest = 0;
const reservation = document.querySelector('#reserve');
const checkin = reservation.querySelector('#check-in');
const checkout = reservation.querySelector('#check-out');

const dateListener = async () => {
  removeError('invalid-dates');
  if (checkin.value != '' && checkout.value != '') {
    const validation = await validateDate(checkin.value, checkout.value);
    if (!validation) {
      checkin.value = '';
      checkout.value = '';
      showError('invalid-dates');
    }
    const numDays = (new Date(checkout.value) - new Date(checkin.value)) / (1000 * 60 * 60 * 24) + 1;
    totalPrice.innerText = Number(housePrice.innerText) * numDays;
  }
};

function buildCarousel(house) {
  housesCarousel.houses = house.photos.map((photo, index) => {
    const container = document.createElement('div');
    const imageSel = document.createElement('img');
    imageSel.src = getPlacePhoto(photo);
    container.appendChild(imageSel);
    container.addEventListener('click', () => {
      housesCarousel.houses[housesCarousel.selected].removeAttribute('class');
      housesCarousel.selected = index;
      displayNewCarousel();
    });
    return container;
  });


  displayNewCarousel();
}

function displayNewCarousel() {
  removeCarouselData();
  const image = document.createElement('img');
  image.setAttribute('class', 'active');
  image.src = housesCarousel.houses[housesCarousel.selected].firstElementChild.src;
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

export default async function getHouseInfo() {
  buildCalendar(new Date(), true);

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


  checkin.addEventListener('change', dateListener);
  checkout.addEventListener('change', dateListener);

  reservation.addEventListener('submit', async ev => {
    ev.preventDefault();
    const number = reservation.querySelector('#people');
    let error = false;

    const formValues = {
      'checkin-checkout-input': [checkin.value, checkout],
      'people-input': [number.value]
    };

    Object.keys(formValues).forEach(key => {
      removeError(key);
      const value = formValues[key].indexOf('');
      if (value != -1) {
        const errorMessage = document.querySelector('#required-input');
        errorMessage.setAttribute('class', 'form-error active');

        error = true;
        showError(key);
      }
    });

    if (number.value > max_guest) {
      showError('num-people');
    }

    if (!error) {
      const response = await request({
        url: `${env.host}api/reserve.php`,
        method: 'POST',
        content: {
          house_id: urlParams.get('id'),
          checkin: checkin.value,
          checkout: checkout.value
        }
      });
      switch (response.status) {
        case 500:
          showError('server-error');
          break;
        case 401:
          showError('login-error');
          break;
        case 201:
          break;
      }
    }
  });

  const id = urlParams.get('id');
  const house = await request({
    url: `${env.host}/api/fetch_house.php`,
    method: 'GET',
    content: {
      id
    }
  });

  buildMainHouseInfo(house);
  buildCarousel(house);
}

