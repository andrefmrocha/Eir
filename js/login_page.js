'use strict';

import env from './env.js';
import { request } from './network.js';
import { showError, removeError, validateEmail } from './form_validation.js';

document.querySelector('form').addEventListener('submit', async ev => {
  ev.preventDefault();
  let error = false;
  const email = document.querySelector('#form-email');
  const password = document.querySelector('#password');
  ['valid-email-input', 'user-not-found', 'wrong-password', 'required-input'].forEach(removeError);
  const formValues = {
    'email-input': email,
    'password-input': password
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

  if (!error) {
    const response = await request({
      url: `${env.host}api/login.php`,
      method: 'POST',
      content: {
        email: email.value,
        password: password.value
      }
    });
    switch (response.status) {
      case 401:
        showError('wrong-password');
        break;
      case 404:
        showError('user-not-found');
        break;
      default:
        window.location.replace(`${env.host}`);
        break;
    }
  }
});
