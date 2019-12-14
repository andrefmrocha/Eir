import { request } from './network.js';
import env from './env.js';
import { buildTag, createTrashIcon } from './tags.js';
import { tagOption } from './house_page_owner.js';
import { showError, removeError } from './form_validation.js';
import { getHouseLocation } from './maps.js';

//======================================================

const body = document.querySelector('body');
let active_modal = false;

function draw_success(house_id) {
    if (active_modal)
        leave_modal();
    
    let img = document.createElement('img');
    img.src = "../assets/success-property.svg";

    let message = document.createElement('p');
    let text = document.createTextNode("Property successfuly added!");
    message.setAttribute('class', 'success_message');
    message.appendChild(text);

    let content = document.createElement('div');
    content.appendChild(img);

    let modal_bg = document.createElement('div');
    modal_bg.setAttribute('class', 'modal_bg');

    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');

    let leave = document.createElement('input');
    leave.setAttribute('class', 'continue');
    leave.setAttribute('type', 'submit');
    leave.setAttribute('value', 'Continue');
    leave.addEventListener('click', function(){leave_modal(house_id)});

    content.setAttribute('class', 'modal_body');

    modal.appendChild(message);
    modal.appendChild(content);
    modal.appendChild(leave);
    modal_bg.appendChild(modal);
    body.appendChild(modal_bg);

    active_modal = true;
}

function leave_modal(house_id) {
    document.querySelector('.modal_bg').remove();
    active_modal = false;

    window.location.replace(`${env.host}pages/house_page.php?id=${house_id}`);
}

//======================================================

function updateMarker(e, maps, marker) {
  const newMarker = new google.maps.Marker({
    position: e.latLng,
    map: maps
  });

  marker && marker.setMap(null);

  newMarker.setMap(maps);
  return newMarker;
}

function generateTagId(tag) {
  return tag.split(' ').join('-');
}

async function getDetails() {
  const selectedTags = [];
  const selectedPhotos = [];

  const allTypes = await request({
    url: `${env.host}api/types.php`,
    method: 'GET',
    content: {}
  });

  const info = document.querySelector('#house-information > aside > div');
  const select = document.querySelector('#house-information > aside > div .select');

  const types = document.querySelector('#house-types');
  const tags = document.querySelector('#house-tags');

  allTypes.forEach(type => {
    const option = document.createElement('option');
    option.innerText = type;
    types.appendChild(option);
  });

  const allTags = await request({
    url: `${env.host}api/tags.php`,
    method: 'GET',
    content: {}
  });

  const noOption = document.createElement('option');
  noOption.innerText = 'New Information';
  noOption.selected = true;
  noOption.disabled = true;
  tags.appendChild(noOption);

  tags.addEventListener('change', () => {
    const tag = buildTag(tags.value);
    selectedTags.push(tags.value);
    tag.addEventListener('click', () => {
      tag.remove();
      tagOption(tag.innerText, tags);
      selectedTags.splice(selectedTags.indexOf(tags.value), 1);
    });
    document.querySelector(`#${generateTagId(tags.value)}`).remove();
    info.insertBefore(tag, select);
    tags.value = 'New Information';
  });

  allTags.forEach(tag => tagOption(tag, tags));

  let marker;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const maps = new google.maps.Map(document.querySelector('#google-maps'), {
        center: coords,
        zoom: 10
      });
      maps.addListener('click', e => {
        marker = updateMarker(e, maps, marker);
      });
    },
    () => {
      const maps = new google.maps.Map(document.querySelector('#google-maps'), {
        center: { lat: 38.736946, lng: -9.142685 },
        zoom: 3
      });
      maps.addListener('click', e => {
        marker = updateMarker(e, maps, marker);
      });
    }
  );

  const photo = document.querySelector('#new-photo');
  photo.addEventListener('change', () => {
    if (photo.files && photo.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'owner-photos');
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${e.target.result})`;
        wrapper.appendChild(img);
        document.querySelector('#carousel').insertBefore(wrapper, document.querySelector('.add-new-photo'));
        const trash = createTrashIcon();
        img.appendChild(trash);
        selectedPhotos.push(photo.files[0]);
        trash.addEventListener('click', () => {
          selectedPhotos.splice(selectedPhotos.indexOf(photo.files[0], 1));
          wrapper.remove();
        });
      };

      reader.readAsDataURL(photo.files[0]);
    }
  });

  let clicked = false;

  document.querySelector('#submit').addEventListener('click', () => {
    if (clicked) {
      return;
    }

    clicked = true;
    const houseError = 'house-error';

    [houseError, 'house-numbers-error', 'unknown-error'].forEach(removeError);

    const formData = {
      title: document.querySelector('#title').value,
      type: types.value,
      max_guest_number: document.querySelector('#max-guest-number').value,
      description: document.querySelector('#description textarea').value,
      price: document.querySelector('#price').value,
      new_tags: selectedTags
    };

    let error = false;

    if (!marker) {
      showError(houseError);
      error = true;
    }

    if (selectedPhotos.length == 0) {
      error = true;
      showError(houseError);
    }

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        error = true;
        showError(houseError);
      }
    });

    [formData.max_guest_number, formData.price].forEach(numParam => {
      if (isNaN(numParam) || numParam < 0) {
        error = true;
        showError('house-numbers-error');
      }
    });

    if (!error) {
      getHouseLocation(marker, async coords => {
        formData.coords = coords;
        const body = new FormData();
        Object.keys(formData).forEach(key =>
          typeof formData[key] === 'object'
            ? body.append(key, JSON.stringify(formData[key]))
            : body.append(key, formData[key])
        );
        selectedPhotos.forEach(photo => body.append('new_photos[]', photo));

        const response = await fetch(`${env.host}api/create_house.php`, {
          method: 'POST',
          body
        });
       
        const house = await response.json();
        
        if (house.id) {
          draw_success(house.id);
        } else {
          clicked = false;
          showError('unknown-error');
        }
      });
    } else {
      clicked = false;
    }
  });
}

getDetails();
