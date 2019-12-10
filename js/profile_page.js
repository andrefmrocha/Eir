import env from './env.js';
import { request } from './network.js';
import { getPersonPhoto } from './image.js';
import { removeError, showError, validateEmail } from './form_validation.js';
import { TOURIST, OWNER } from './common.js';
import { getOwnProperties, tintProfileLeaves } from './profile_page_owner.js';
import getRentalHistory from './profile_page_tourist.js';

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

const pageView = localStorage.getItem('page-view');
getProfile();
if (pageView == TOURIST) {
  getRentalHistory();
} else {
  getOwnProperties();
  tintProfileLeaves();
}
