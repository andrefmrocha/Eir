import env from './env.js';
import { request } from './network.js';
import { getPersonPhoto, getPlacePhoto } from './image.js';
import { removeError, showError, validateEmail } from './form_validation.js';
import carousel from './carousel.js';
import { generateHouseUrl } from './houses.js';

const profilePic = document.querySelector('.card section div img');
const picInput = document.querySelector('#profile-picture');
const fullname = document.querySelector('#full-name');
const formEmail = document.querySelector('#form-email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const birthday = document.querySelector('#birthday');
const country = document.querySelector('#country');
const description = document.querySelector('#description');

picInput.addEventListener('change', () => {
  if (picInput.files && picInput.files[0]) {
    const reader = new FileReader();

    reader.onload = e => (profilePic.src = e.target.result);

    reader.readAsDataURL(picInput.files[0]);
  }
});

document.querySelector('form').addEventListener('submit', async ev => {
  const formParameters = {
    'email-input': formEmail,
    'fullname-input': fullname,
    'birthday-input': birthday,
    'country-input': country
  };
  ['password-match-input', 'valid-email-input'].forEach(errorMessage => removeError(errorMessage));
  let error = false;
  ev.preventDefault();
  Object.keys(formParameters).forEach(formParameter => {
    removeError(formParameter);
    const value = formParameters[formParameter].value;
    if (!value) {
      const errorMessage = document.querySelector('#required-input');
      errorMessage.setAttribute('class', 'form-error active');

      error = true;
      showError(formParameter);
    }
  });

  if (!validateEmail(formEmail.value)) {
    error = true;
    showError('valid-email-input');
  }

  if (!error) {
    const body = {
      full_name: fullname.value,
      email: formEmail.value,
      birth_date: birthday.value,
      country: country.value
    };
    if (password.value != '' && confirmPassword.value != '' && password.value != confirmPassword.value) {
      showError('password-match-input');
    } else if (password.value != '' && confirmPassword != value) {
      body.password = password.value;
    }

    if (description.value) {
      body.description = description.value;
    }

    if (picInput.files.length > 0) {
      body.photo = picInput.files[0];
    }

    const response = await request({
      url: `${env.host}api/update_profile.php`,
      method: 'POST',
      content: body
    });
  }
});

async function getProfile() {
  const profile = await request({
    url: `${env.host}api/get_profile.php`,
    method: 'GET',
    content: {}
  });

  const formParameters = {
    email: formEmail,
    full_name: fullname,
    birth_date: birthday,
    country,
    bio: description
  };

  Object.keys(formParameters).forEach(
    parameter => (formParameters[parameter].value = profile[parameter] ? profile[parameter] : '')
  );
  const personPhoto = getPersonPhoto(profile.photo);
  profilePic.src = personPhoto;
}

async function getRentalHistory() {
  const houses = await request({
    url: `${env.host}api/get_rental_history.php`,
    method: 'GET',
    content: {}
  });

  const housesNode = document.querySelector('#rentals-history > div > p');

  carousel.photos = houses.map(buildHouse);
  carousel.buildCarousel(housesNode);

  const left = document.querySelector('.fa-chevron-left');
  const right = document.querySelector('.fa-chevron-right');

  if (houses.length > 2) {
    left.addEventListener('click', () => carousel.previous(housesNode));
    right.addEventListener('click', () => carousel.next(housesNode));
  } else {
    left.remove();
    right.remove();
  }
}

function buildHouse(house) {
  const imgReference = document.createElement('a');
  imgReference.href = generateHouseUrl(house.id);
  const image = document.createElement('img');
  imgReference.appendChild(image);
  image.src = getPlacePhoto(house.photo);
  const wrapper = document.createElement('span');
  wrapper.appendChild(imgReference);
  const title = document.createElement('p');
  const titleWrapper = document.createElement('a');
  titleWrapper.href = generateHouseUrl(house.id);
  titleWrapper.appendChild(title);
  title.innerText = house.title;
  const dates = document.createElement('p');
  dates.innerHTML = `Between <strong> ${house.checkin} </strong> and <strong> ${house.checkout} </strong>`;
  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(dates);
  return wrapper;
}

getProfile();
getRentalHistory();
