'use strict';

import env from './env.js';
import { request } from './network.js';
import { showError, removeError, validateEmail } from './form_validation.js';

document.querySelector('form').addEventListener('submit', async ev => {
  ev.preventDefault();
  let error = false;
  const name = document.querySelector('#full-name');
  const email = document.querySelector('#form-email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirm-password');
  const birthday = document.querySelector('#birthday');
  const country = document.querySelector('#country');
  ['valid-email-input', 'password-match-input', 'required-input'].forEach(removeError);
  const formValues = {
    'fullname-input': name,
    'email-input': email,
    'password-input': password,
    'confirm-password-input': confirmPassword,
    'birthday-input': birthday,
    'country-input': country
  };

  Object.keys(formValues).forEach(formValue => {
    removeError(formValue);
    const value = formValues[formValue].value;

    if (!value) {
      const errorMessage = document.querySelector('#required-input');
      errorMessage.setAttribute('class', 'form-error active');

      error = true;
      showError(formValue);
    }
  });

  if (!validateEmail(email.value)) {
    error = true;
    showError('valid-email-input');
  }

  if (password.value && confirmPassword.value && password.value != confirmPassword.value) {
    showError('password-match-input');
  }
  if (!error) {
    const response = await request({
      url: `${env.host}/api/signup.php`,
      method: 'POST',
      content: {
        full_name: name.value,
        email: email.value,
        password: password.value,
        birth_date: birthday.value,
        country: country.value
      }
    });
    switch (response.status) {
      case 400:
        showError('valid-email-input');
        break;
      case 403:
        showError('register-email-input');
        break;
      default:
        window.location.replace(`${env.host}/`);
        break;
    }
  }
});
