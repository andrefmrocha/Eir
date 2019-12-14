export function showError(id) {
  const errorInfo = document.querySelector(`#${id}`);
  errorInfo.setAttribute('class', 'form-error active');
}

export function removeError(id) {
  const paragraph = document.querySelector(`#${id}`);
  paragraph.setAttribute('class', 'form-error');
}

export function validateEmail(value) {
  // eslint-disable-next-line max-len
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value.toLowerCase());
}
