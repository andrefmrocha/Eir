document.querySelector('nav div').addEventListener('click', () => {
  const navbar = document.querySelector('nav ul');
  if (navbar.classList.contains('visible')) navbar.removeAttribute('class', 'visible');
  else navbar.setAttribute('class', 'visible');
});
