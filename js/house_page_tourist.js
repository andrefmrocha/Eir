'use strict';

import { request } from './network.js';
import env from './env.js';
import { getPlacePhoto } from './image.js';
import { showError, removeError } from './form_validation.js';
import { buildCalendar, validateDate, updatePrice } from './calendar.js';
import buildMainHouseInfo from './house_helper_functions.js';
import successfulReservation from './modal.js';
import { buildComment } from './house_helper_functions.js';

const carousel = document.querySelector('#photos-carousel');
const reviews = document.querySelector('#reviews');
const houseInformation = document.querySelector('#house-information');

const urlParams = new URL(window.location).searchParams;

const housesCarousel = {
  selected: 0,
  houses: []
};

const reservation = document.querySelector('#reserve');
const checkin = reservation.querySelector('#check-in');
const checkout = reservation.querySelector('#check-out');

const dateListener = async () => {
  removeError('invalid-dates');
  if (checkin.value != '' && checkout.value != '') {
    const startDate = new Date(checkin.value);
    const endDate = new Date(checkout.value);
    const calendar = await buildCalendar(startDate, true);
    houseInformation.replaceChild(calendar, document.querySelector('.calendar'));
    const validation = await validateDate(startDate, endDate, calendar.querySelectorAll('td'));
    if (!validation) {
      checkin.value = '';
      checkout.value = '';
      showError('invalid-dates');
    }
    updatePrice(checkin, checkout);
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

async function buildCommentsSection(id, house) {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const response = await request({
    url: `${env.host}api/rate_eligible.php`,
    method: 'POST',
    content: {
      house_id: id,
      date: currentDate
    }
  });

  const reviewsSection = document.querySelector('#reviews');
  const comments = document.querySelector('#reviews > div');
  if (response.eligible) {
    const textarea = document.createElement('textarea');
    textarea.rows = 4;

    const wrapper = document.createElement('form');
    wrapper.id = 'add-review';
    wrapper.appendChild(textarea);
    const rating = document.createElement('span');
    wrapper.appendChild(rating);
    const stars = [];
    let starRating;
    const removeStars = () => {
      stars.forEach(star => {
        if (star.className.search('clicked') == -1) {
          star.classList.add('far');
          star.classList.remove('fas');
        } else if (star.className.search('fas') == -1) {
          star.classList.add('fas');
          star.classList.remove('far');
        }
      });
    };

    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      star.setAttribute('class', 'far fa-star');
      stars.push(star);
      rating.appendChild(star);
      const addStars = clicked => {
        for (let j = 0; j <= i; j++) {
          stars[j].classList.replace('far', 'fas');
          clicked && stars[j].classList.add('clicked');
        }

        for (let j = i + 1; j < 5; j++) {
          stars[j].classList.replace('fas', 'far');
          clicked && stars[j].classList.remove('clicked');
        }
      };
      star.addEventListener('mouseenter', () => addStars(false));
      star.addEventListener('mouseleave', removeStars);

      star.addEventListener('click', () => {
        addStars(true);
        starRating = i + 1;
      });
    }

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('button');
    submit.value = 'POST';
    wrapper.appendChild(submit);

    reviewsSection.insertBefore(wrapper, comments);

    const submitForm = async () => {
      const formData = {
        comment: textarea.value,
        rating: starRating
      };

      let error = false;
      Object.keys(formData).forEach(key => {
        if (!formData[key] || formData[key] == '') error = true;
      });

      if (error) return;

      const response = await request({
        url: `${env.host}api/add_comment.php`,
        method: 'POST',
        content: {
          house_id: id,
          date: currentDate,
          ...formData
        }
      });

      document.querySelector('#reviews > span > span > span > span').innerText = response.rating
        .toString()
        .substr(0, 3);
      document.querySelector('#reviews > span > span > span:nth-child(2)').innerText = `${house.reviews.length +
        1} Reviews`;

      comments.appendChild(buildComment(response));
      wrapper.remove();
    };

    textarea.addEventListener('keydown', e => {
      if (e.key == 'Enter' && !e.shiftKey) {
        submitForm();
      }
    });

    wrapper.addEventListener('submit', ev => {
      ev.preventDefault();
      submitForm();
    });
  }
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

async function drawCalendar(date) {
  const calendar = await buildCalendar(date, true);
  const previous = calendar.querySelector('.fa-chevron-left');
  const next = calendar.querySelector('.fa-chevron-right');
  const previousCalendar = houseInformation.querySelector('.calendar');
  previousCalendar && houseInformation.removeChild(previousCalendar);
  houseInformation.insertBefore(calendar, document.querySelector('#google-maps'));
  previous.addEventListener('click', () => drawCalendar(new Date(date.getFullYear(), date.getMonth() - 1), true));
  next.addEventListener('click', () => drawCalendar(new Date(date.getFullYear(), date.getMonth() + 1), true));
}

export default async function getHouseInfo() {
  drawCalendar(new Date());

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
  buildCommentsSection(id, house);

  reservation.addEventListener('submit', async ev => {
    ev.preventDefault();
    const number = reservation.querySelector('#people');
    let error = false;
    removeError('num-people');

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

    if (number.value > house.max_guest_number) {
      showError('num-people');
      error = true;
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
            successfulReservation("Reservation was successful!", '../assets/success-badge.svg', `${env.host}pages/profile_page.php`);
          break;
      }
    }
  });
}
