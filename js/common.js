const pageView = document.querySelector('#page-view');
export const TOURIST = 'TOURIST';
export const OWNER = 'OWNER';

let viewMode = localStorage.getItem('page-view');

if (!viewMode || (viewMode != TOURIST && viewMode != OWNER)) {
  localStorage.setItem('page-view', TOURIST);
  viewMode = TOURIST;
}

if (viewMode == TOURIST) {
  pageView.innerText = OWNER;
  pageView.addEventListener('click', () => {
    localStorage.setItem('page-view', OWNER);
    location.reload();
  });
} else {
  pageView.innerText = TOURIST;
  pageView.addEventListener('click', () => {
    localStorage.setItem('page-view', TOURIST);
    location.reload();
  });
}
