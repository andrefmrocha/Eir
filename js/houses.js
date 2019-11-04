import { request } from './network.js'
import env from './env.js'

request({
    url: `${env.host}/api/fetch_houses.php`,
    method: 'GET',
    content: {}
}).then((response) => {
    const content = document.getElementById('content');
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'houses-list');
    response.forEach((house) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'house-item');
        li.innerHTML+= `${house.description} - ${house.price_per_day}`;
        ul.appendChild(li);
    });
    content.appendChild(ul);
}).catch(() => console.log('Failed to fetch data'));
