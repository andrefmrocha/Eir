import { request } from './network.js';
import { getPlacePhoto, getPersonPhoto } from './image.js';
import { generateHouseUrl } from './houses.js';
import carousel from './carousel.js';
import env from './env.js';

const urlParams = new URL(window.location).searchParams;

async function buildUserProfile() {
  const id = urlParams.get('id');
  const user = await request({
    url: `${env.host}api/get_user_profile.php`,
    method: 'GET',
    content: { id }
  });
  buildUserProfileCard(user);
  buildReviewsCarrousel(user.reviews);
}

async function buildUserProfileCard(user) {
  const fullName = user['full_name'];
  document.querySelector('#full-name').innerText = fullName;

  const country = (
    await request({
      method: 'GET',
      url: `https://restcountries.eu/rest/v2/alpha/${user['country']}`,
      content: {
        fields: 'name'
      }
    })
  ).name;
  document.querySelector('#country span').innerText = country;

  const bio = user['bio'] ? user['bio'] : "This user hasn't set their bio yet";
  document.querySelector('#bio p').innerText = bio;

  const photo = getPersonPhoto(user['photo']);
  const img = document.createElement('img');
  img.src = photo;
  document.querySelector('.profile-picture div').appendChild(img);
}

async function buildReviewsCarrousel(reviews) {
  const left = document.querySelector('.fa-chevron-left');
  const right = document.querySelector('.fa-chevron-right');
  if (!reviews.length || reviews.length < 1) {
    left.remove();
    right.remove();
    return;
  }

  const reviewsNode = document.querySelector('#profile-carrousel > div > p');

  carousel.photos = reviews.map(buildReview);
  carousel.buildCarousel(reviewsNode);

  if (reviews.length > 2) {
    left.addEventListener('click', () => carousel.previous(reviewsNode));
    right.addEventListener('click', () => carousel.next(reviewsNode));
  } else {
    left.remove();
    right.remove();
  }
}

function buildReview(review) {
  const placeUrl = generateHouseUrl(review.id);

  const image = document.createElement('img');
  image.src = getPlacePhoto(review.photo);
  const imgAnchor = document.createElement('a');
  imgAnchor.href = placeUrl;
  imgAnchor.appendChild(image);

  const title = document.createElement('p');
  title.innerText = review.name;
  const titleWrapper = document.createElement('a');
  titleWrapper.href = placeUrl;
  titleWrapper.appendChild(title);

  const rating = Math.round(review.rating);
  const ratingNode = document.createElement('span');
  for (let i = 0; i < rating; i++) {
    const star = document.createElement('i');
    star.classList = ['fas fa-star'];
    ratingNode.appendChild(star);
  }

  const wrapper = document.createElement('span');
  wrapper.appendChild(imgAnchor);
  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(ratingNode);
  return wrapper;
}

buildUserProfile();
