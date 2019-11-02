import { request } from './network.js'


request({
    url: 'http://localhost:8000/api/fetch_houses.php',
    method: 'GET',
    content: {}
}).then((response) => {
    const content = document.getElementById('content');
    content.innerHTML = `<ul>`;
    response.forEach((house) => {
        content.innerHTML+= `<li>${house.description} - ${house.price_per_day}</li>`;
    });
    content.innerHTML += `</ul>`;
    console.log(response);
}).catch(() => console.log('Failed to fetch data'));
