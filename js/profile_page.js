import env from './env.js';
import { request } from './network.js';
import { getPersonPhoto, getPlacePhoto } from './image.js';
import { removeError, showError } from './form_validation.js';

const profilePic = document.querySelector('.card > section > img:nth-child(2)');
const fullname = document.querySelector('#full-name');
const formEmail = document.querySelector('#form-email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const birthday = document.querySelector('#birthday');
const country = document.querySelector('#country');
const description = document.querySelector('#description');

document.querySelector('form').addEventListener('submit', async ev => {
  const formParameters = {
    'email-input': formEmail,
    'fullname-input': fullname,
    'birthday-input': birthday,
    'country-input': country,
    'description-input': description
  };
  ['password-match-input'].forEach(errorMessage => removeError(errorMessage));
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

  if (!validateEmail(email.value)) {
    error = true;
    showError('valid-email-input');
  }

  if (!error) {
    const body = {
      full_name: fullname.value,
      email: formEmail.value,
      birth_date: birthday.value,
      country: country.value,
      bio: description.value
    }
    if (password.value != "" && confirmPassword.value != "" && password.value != confirmPassword.value) {
      showError('password-match-input');
    } else if (password.value != "" && confirmPassword != value) {
      body.password = password.value;
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

  profilePic.src = getPersonPhoto(profile.photo);

}

async function getRentalHistory(){
  const houses = await request({
    url: `${env.host}api/get_rental_history.php`,
    method: 'GET',
    content: {}
  });

  const housesDiv = document.querySelector('#rentals-history > div');

  houses.forEach((house) => {
    const image = document.createElement('img');
    image.src = getPlacePhoto(house.photo);
    const wrapper = document.createElement('span');
    wrapper.appendChild(image);
    const title = document.createElement('p');
    title.innerText = house.title;
    const dates = document.createElement('p');
    dates.innerHTML = `Between <strong> ${house.checkin} </strong> and <strong> ${house.checkout} </strong>`;
    wrapper.appendChild(title);
    wrapper.appendChild(dates);
    housesDiv.appendChild(wrapper);
  });
}

getProfile();
getRentalHistory();
