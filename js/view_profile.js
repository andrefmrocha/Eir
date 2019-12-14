import { request } from './network.js';
import env from './env.js';

const urlParams = new URL(window.location).searchParams;

async function buildUserProfile() {
    const id = urlParams.get('id');
    const user = await request({
        url: `${env.host}api/get_user_profile.php`,
        method: 'GET',
        content: { id }
    });
    const fullName = user['full_name'];
    document.querySelector('#full-name').innerText = fullName;

    const country = (await request({
        method: 'GET',
        url: `https://restcountries.eu/rest/v2/alpha/${user['country']}`,
        content: {
            fields: 'name'
        }
    })).name;
    document.querySelector('#country p').innerText = country;

    const bio = user['bio'] ? user['bio'] : 'This user hasn\'t set their bio yet';
    document.querySelector('#bio p').innerText = bio;

    const photo = `${env.host}assets/user_photos/eir_${user['photo'] ? user['photo'] : 'unknown'}.jpg`;
    const img = document.createElement('img');
    img.src = photo;
    document.querySelector('.profile-picture').appendChild(img);
}

buildUserProfile();
