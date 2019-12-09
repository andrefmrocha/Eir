import { request } from './network.js';
import env from './env.js';
import buildMainHouseInfo from './house_helper_functions.js';
import { getPlacePhoto } from './image.js';
import { getTourist } from './common.js';
import { buildCalendar } from './calendar.js';
import carousel from './carousel.js';

const photos = document.querySelector('#carousel');
const urlParams = new URL(window.location).searchParams;
const houseInformation = document.querySelector('#house-information');

export default async function buildOwnerView() {
  const house = await request({
    url: `${env.host}api/owner_house_view.php`,
    method: 'GET',
    content: {
      id: urlParams.get('id')
    }
  });

  if (house.status == 403 || house.status == 401) {
    getTourist();
  } else {
    houseInformation.removeChild(document.querySelector('#reserve'));
    buildMainHouseInfo(house);
    while (photos.firstElementChild) {
      photos.removeChild(photos.firstElementChild);
    }

    photos.setAttribute('class', 'owner-view');
    house.photos.forEach(photo => {
      const wrapper = document.createElement('div');
      const img = document.createElement('img');
      img.src = getPlacePhoto(photo);
      wrapper.setAttribute('class', 'owner-photos');
      wrapper.appendChild(img);
      photos.appendChild(wrapper);
    });

    const calendars = [];
    const date = new Date();
    for (let index = 0; index < 12; index++) {
      calendars.push(buildCalendar(new Date(date.getFullYear(), date.getMonth() + index), false));
    }
    const calendarArticle = document.createElement('article');
    calendarArticle.setAttribute('id', 'calendars');
    const calendarDiv = document.createElement('div');
    const previous = document.createElement('i');
    previous.setAttribute('class', 'fas fa-chevron-left hidden');
    const next = document.createElement('i');
    next.setAttribute('class', 'fas fa-chevron-right');
    calendarArticle.appendChild(previous);
    calendarArticle.appendChild(calendarDiv);
    calendarArticle.appendChild(next);

    houseInformation.insertBefore(calendarArticle, document.querySelector('#reviews'));
    carousel.photos = await Promise.all(calendars);
    next.addEventListener('click', () => {
      if (next.classList.contains('hidden')) return;
      carousel.next(calendarDiv);
      if (carousel.index == carousel.photos.length - 2) {
        next.classList.add('class', 'hidden');
      } else {
        previous.classList.remove('hidden');
      }
    });
    previous.addEventListener('click', () => {
      if (previous.classList.contains('hidden')) return;
      carousel.previous(calendarDiv);
      if (carousel.index == 0) {
        previous.classList.add('class', 'hidden');
      } else {
        next.classList.remove('hidden');
      }
    });

    carousel.buildCarousel(calendarDiv);
  }
}
