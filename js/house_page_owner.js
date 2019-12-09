import { request } from './network.js';
import env from './env.js';
import buildMainHouseInfo from './house_helper_functions.js';
import { getPlacePhoto } from './image.js';

const photos = document.querySelector('#carousel');
const urlParams = new URL(window.location).searchParams;

export default async function buildOwnerView() {
  const house = await request({
    url: `${env.host}api/owner_house_view.php`,
    method: 'GET',
    content: {
      id: urlParams.get('id')
    }
  });

  if (house.status == 403) {
    //TODO go to 403 page
  } else {
    buildMainHouseInfo(house);
    while (photos.firstElementChild) {
      photos.removeChild(photos.firstElementChild);
    }

    photos.setAttribute('class', 'owner-view');
    house.photos.forEach(photo => {
      const wrapper = document.createElement('div');
      const img = document.createElement('img');
      img.src = getPlacePhoto(photo);
      wrapper.setAttribute('class', 'owner-photos');
      wrapper.appendChild(img);
      photos.appendChild(wrapper);
    });
  }
}
