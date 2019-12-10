import { request } from './network.js';
import env from './env.js';
import buildMainHouseInfo from './house_helper_functions.js';
import { getPlacePhoto } from './image.js';
import { getTourist } from './common.js';
import { buildCalendar } from './calendar.js';
import { buildTag, createTrashIcon } from './tags.js';
import { showError, removeError } from './form_validation.js';
import carousel from './carousel.js';

const photos = document.querySelector('#carousel');
const urlParams = new URL(window.location).searchParams;
const houseInformation = document.querySelector('#house-information');

function tagOption(tag, select) {
  const option = document.createElement('option');
  option.setAttribute('id', tag.split(' ').join('-'));
  option.innerText = tag;
  select.appendChild(option);
}

async function buildEditableView(house) {
  const removingTags = [];
  const selectedTags = [];
  const selectedPhotos = [];
  const removingPhotos = [];

  document.querySelector('#house-page').classList.add('editable');
  const description = document.querySelector('#description');
  const descriptionText = document.querySelector('#description div');
  const descriptionTextField = document.createElement('textarea');
  const priceWrapper = document.createElement('div');
  priceWrapper.innerText = 'Price:';
  const moneyIcon = document.createElement('i');
  moneyIcon.setAttribute('class', 'fas fa-money-bill-wave');
  const price = document.createElement('input');
  price.value = house.price_per_day;
  priceWrapper.appendChild(price);
  priceWrapper.appendChild(moneyIcon);

  description.appendChild(priceWrapper);
  descriptionTextField.value = descriptionText.innerText;
  description.replaceChild(descriptionTextField, descriptionText);

  const photos = document.querySelector('.owner-view');
  document.querySelectorAll('.owner-view > div').forEach(photo => {
    photo.querySelector('.fa-trash').addEventListener('click', () => {
      removingPhotos.push(photo.querySelector('div').id);
      photos.removeChild(photo);
    });
  });
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
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'owner-photos');
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${e.target.result})`;
        wrapper.appendChild(img);
        photos.insertBefore(wrapper, addNewPhoto);
        const trash = createTrashIcon();
        img.appendChild(trash);
        selectedPhotos.push(e.target.result);
        trash.addEventListener('click', () => {
          selectedPhotos.splice(selectedPhotos.indexOf(e.target.result, 1));
          photos.removeChild(wrapper);
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  });

  const houseDescription = document.querySelector('#house-description');
  const locationWrapper = document.querySelector('#house-description h3');
  const houseTitle = document.querySelector('#house-description h1');
  const houseLocation = document.querySelector('#house-description h3 span');

  const inputTitle = document.createElement('input');
  inputTitle.value = houseTitle.innerText;

  const inputCountry = document.createElement('input');
  inputCountry.value = house.country;
  const inputLocation = document.createElement('input');
  inputLocation.value = houseLocation.innerText;

  houseDescription.replaceChild(inputTitle, houseTitle);
  locationWrapper.replaceChild(inputLocation, houseLocation);
  locationWrapper.appendChild(inputCountry);

  const currentTags = document.querySelector('#house-information > aside > div');
  const infoWrapper = document.querySelectorAll('#house-information > aside > div > span');
  const tags = document.querySelectorAll('#house-information > aside > div > span span');
  const types = document.createElement('select');
  const numBeds = document.createElement('input');
  numBeds.type = 'number';
  numBeds.value = house.max_guest_number;

  const allTypes = await request({
    url: `${env.host}api/types.php`,
    method: 'GET',
    content: {}
  });

  allTypes.forEach(type => {
    const option = document.createElement('option');
    option.innerText = type;
    types.appendChild(option);
  });

  infoWrapper[0].replaceChild(types, tags[0]);
  infoWrapper[1].replaceChild(numBeds, tags[1]);

  const allTags = await request({
    url: `${env.host}api/tags.php`,
    method: 'GET',
    content: {}
  });

  const missingTags = allTags.filter(tag => house.tags.indexOf(tag) == -1);

  const addNewTag = document.createElement('i');
  addNewTag.setAttribute('class', 'fas fa-plus');

  const tagsWrapper = document.createElement('div');
  tagsWrapper.setAttribute('class', 'select');

  const select = document.createElement('select');
  const noOption = document.createElement('option');
  noOption.innerText = 'New Information';
  noOption.selected = true;
  noOption.disabled = true;
  select.appendChild(noOption);

  missingTags.forEach(tag => {
    tagOption(tag, select, currentTags);
  });

  select.addEventListener('change', () => {
    const tag = buildTag(select.value);
    selectedTags.push(select.value);
    tag.addEventListener('click', () => {
      currentTags.removeChild(tag);
      tagOption(tag.innerText, select);
      selectedTags.splice(selectedTags.indexOf(select.value), 1);
    });
    currentTags.insertBefore(tag, tagsWrapper);
    select.removeChild(select.querySelector(`#${select.value.split(' ').join('-')}`));
    select.value = 'New Information';
  });

  document.querySelectorAll('#house-information > aside > div > div').forEach(tag => {
    const trash = tag.querySelector('.fa-trash');
    trash.addEventListener('click', () => {
      currentTags.removeChild(tag);
      tagOption(tag.innerText, select);
      removingTags.push(selectedTags);
    });
  });
  tagsWrapper.appendChild(addNewTag);
  tagsWrapper.appendChild(select);
  currentTags.appendChild(tagsWrapper);

  const editButton = document.querySelector('#edit-button');
  const submitButton = document.createElement('div');
  submitButton.classList.add('button');
  submitButton.innerText = 'Submit';
  houseInformation.replaceChild(submitButton, editButton);

  const errorLabel = document.createElement('p');
  errorLabel.innerText = 'Please leave no field empty';
  const errorId = 'house-error';
  errorLabel.setAttribute('id', errorId);
  errorLabel.classList.add('form-error');
  houseInformation.insertBefore(errorLabel, document.querySelector('#reviews'));

  submitButton.addEventListener('click', () => {
    // title, country, location, type, numBeds, tags, description, photos, price
    const formData = {
      title: inputTitle.value,
      country: inputCountry.value,
      location: inputLocation.value,
      type: types.value,
      max_guest_number: numBeds.value,
      description: descriptionTextField.value,
      price: price.value
    };

    let error = false;

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        console.log(key);
        error = true;
        showError(errorId);
      }
    });

    formData.new_photos = selectedPhotos;
    formData.removing_photos = removingPhotos;
    formData.new_tags = selectedTags;
    formData.removing_tags = removingTags;

    console.log(formData);
  });
}

async function buildDashboard(house) {
  houseInformation.removeChild(document.querySelector('#reserve'));
  buildMainHouseInfo(house);
  while (photos.firstElementChild) {
    photos.removeChild(photos.firstElementChild);
  }

  photos.setAttribute('class', 'owner-view');
  house.photos.forEach(photo => {
    const wrapper = document.createElement('div');
    const img = document.createElement('div');
    img.id = photo;
    img.style.backgroundImage = `url(${getPlacePhoto(photo)})`;
    img.appendChild(createTrashIcon());
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
  editButton.classList.add('button');
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
