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

async function buildEditableView(house){
    console.log(house);
    const description = document.querySelector('#description');
    const descriptionText = document.querySelector('#description div');
    const descriptionTextField = document.createElement('textarea');
    descriptionTextField.value = descriptionText.innerText;
    description.removeChild(descriptionText);
    description.appendChild(descriptionTextField);
    const photos = document.querySelector('.owner-view');
    const addNewPhoto = document.createElement('div');
    addNewPhoto.setAttribute('class', 'add-new-photo');
    const label = document.createElement('label');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-plus');
    label.appendChild(icon);
    label.htmlFor = 'new-photo';
    const input = document.createElement('input');
    input.setAttribute('id', 'new-photo');
    input.setAttribute('name', 'new-photo');
    input.type = 'file';
    addNewPhoto.appendChild(label);
    addNewPhoto.appendChild(input);
    photos.appendChild(addNewPhoto);

    input.addEventListener('change', () => {
        if(input.files && input.files[0]){
            const reader = new FileReader();

            reader.onload = e => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'owner-photos');
                const img = document.createElement('img');
                img.src = e.target.result;
                wrapper.appendChild(img);
                photos.insertBefore(wrapper, addNewPhoto)
            };

            reader.readAsDataURL(input.files[0]);
        }
    });

    const houseDescription  = document.querySelector('#house-description');
    const locationWrapper = document.querySelector('#house-description h3');
    const houseTitle = document.querySelector('#house-description h1');
    const houseLocation = document.querySelector('#house-description h3 span');

    const inputTitle = document.createElement('input');
    inputTitle.value = houseTitle.innerText;

    const inputLocation = document.createElement('input');
    inputLocation.value = houseLocation.innerText;

    houseDescription.removeChild(houseTitle);
    locationWrapper.removeChild(houseLocation);
    houseDescription.insertBefore(inputTitle, locationWrapper);
    locationWrapper.appendChild(inputLocation);


    const currentTags = document.querySelector('#house-information > aside > div');
    const allTags = await request({
        url: `${env.host}api/tags.php`,
        method: 'GET',
        content: {}
    });
    const missingTags = allTags.filter((tag) => house.tags.indexOf(tag) == -1);
    console.log(missingTags);

    const select = document.createElement('select');
    missingTags.forEach((tag) => {
        const option = document.createElement('option');
        option.innerText = tag;
        select.appendChild(option);
    });

    currentTags.appendChild(select);
}

async function buildDashboard(house){
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

    const editButton = document.createElement('div');
    editButton.setAttribute('id', 'edit-button');
    editButton.innerText = 'Edit';
    houseInformation.insertBefore(editButton, document.querySelector('#reviews'));
    editButton.addEventListener('click', () => buildEditableView(house));

    carousel.buildCarousel(calendarDiv);
}

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

    await buildDashboard(house);
  }
}
