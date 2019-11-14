import { request } from './network.js'
import env from './env.js'

const urlParams = (new URL(window.location)).searchParams;

getAllHouses();

async function getAllHouses() {
    const country = urlParams.get('country');
    const city = urlParams.get('city');
    const checkin = urlParams.get('checkin');
    const checkout = urlParams.get('checkout');
    const people = urlParams.get('people');
    const possibleCountries = await request({
        url: `https://restcountries.eu/rest/v2/name/${country}`,
        method: 'GET',
        content: {}
    });

    possibleCountries.forEach(async (country) => {
        const content = {
            city,
            checkin,
            checkout,
            people,
            country: country.alpha2Code
        };
        const houses = await request({
            url: `${env.host}/api/get_houses.php`,
            method: 'POST',
            content
        });
        addNewHouses(houses);
    });
}


function generateIcons() {
    const houseIcon = document.createElement('i');
    houseIcon.setAttribute('class', 'fas fa-lg fa-home');
    const starIcon = document.createElement('i');
    starIcon.setAttribute('class', 'fas fa-lg fa-star');
    const bedIcon = document.createElement('i');
    bedIcon.setAttribute('class', 'fas fa-lg fa-bed');
    const moneyIcon = document.createElement('i');
    moneyIcon.setAttribute('class', 'fas fa-lg fa-money-bill-wave');
    const petIcon = document.createElement('i');
    petIcon.setAttribute('class', 'fas fa-lg fa-paw');
    const babyIcon = document.createElement('i');
    babyIcon.setAttribute('class', 'fas fa-lg fa-baby');
    const swimmingPoolIcon = document.createElement('i');
    swimmingPoolIcon.setAttribute('class', 'fas fa-lg fa-swimming-pool');
    const breakfastIcon = document.createElement('i');
    breakfastIcon.setAttribute('class', 'fas fa-lg fa-utensils');
    const greenSpacesIcon = document.createElement('i');
    breakfastIcon.setAttribute('class', 'fas fa-lg fa-seedling');
    return {
        houseIcon,
        starIcon,
        bedIcon,
        moneyIcon,
        petIcon,
        babyIcon,
        swimmingPoolIcon,
        breakfastIcon,
        greenSpacesIcon
    }
}


const housesSection = document.querySelector('#houses');

function addNewHouses(houses) {
    houses.forEach(house => {
        const icons = generateIcons();
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.src = `../assets/place_photos/eir_${house.photo}.jpg`;
        const houseDescription = document.createElement('div');
        const header = document.createElement('header')
        header.innerText = house.title;
        houseDescription.appendChild(header);
        const houseCharateristics = document.createElement('div');
        const houseType = document.createElement('span');
        houseType.appendChild(icons.houseIcon);
        const houseTypeText = document.createElement('span');
        houseTypeText.innerText = house.name;
        houseType.appendChild(houseTypeText);
        houseCharateristics.appendChild(houseType);
        const rating = document.createElement('span');
        const ratingText = document.createElement('span');
        ratingText.innerText = house.rating;
        rating.appendChild(ratingText);
        rating.appendChild(icons.starIcon);
        houseCharateristics.appendChild(rating);
        const numBeds = document.createElement('span');
        const numBedsText = document.createElement('span');
        numBedsText.innerText = `${house.max_guest_number} Beds`;
        numBeds.appendChild(icons.bedIcon);
        numBeds.appendChild(numBedsText);
        houseCharateristics.appendChild(numBeds);
        const price = document.createElement('span');
        const priceText = document.createElement('span');
        priceText.innerText = `${house.price_per_day}€`;
        price.appendChild(priceText);
        price.appendChild(icons.moneyIcon);
        houseCharateristics.appendChild(price);
        if (house.tags.indexOf('Baby Friendly') != -1) {
            const babyFriendly = document.createElement('span');
            const babyFriendlyText = document.createElement('span');
            babyFriendlyText.innerText = 'Baby Friendly';
            babyFriendly.appendChild(icons.babyIcon);
            babyFriendly.appendChild(babyFriendlyText);
            houseCharateristics.appendChild(babyFriendly);
        }
        if (house.tags.indexOf('Pet Friendly') != -1) {
            const petFriendly = document.createElement('span');
            const petFriendlyText = document.createElement('span');
            petFriendlyText.innerText = 'Pet Friendly';
            petFriendly.appendChild(icons.petIcon);
            petFriendly.appendChild(petFriendlyText);
            houseCharateristics.appendChild(petFriendly);
        }
        if (house.tags.indexOf('Swimming Pool') != -1) {
            const swimmingPool = document.createElement('span');
            const swimmingPoolText = document.createElement('span');
            swimmingPoolText.innerText = 'Swimming Pool';
            swimmingPool.appendChild(icons.swimmingPoolIcon);
            swimmingPool.appendChild(swimmingPoolText);
        }
        if (house.tags.indexOf('Breakfast Included') != -1) {
            const breakfast = document.createElement('span');
            const breakfastText = document.createElement('span');
            breakfastText.innerText = 'Swimming Pool';
            breakfast.appendChild(icons.breakfastIcon);
            breakfast.appendChild(breakfastText);
        }
        if (house.tags.indexOf('Green Spaces') != -1) {
            const greenSpaces = document.createElement('span');
            const greenSpacesText = document.createElement('span');
            greenSpacesText.innerText = 'Green Spaces';
            greenSpaces.appendChild(icons.greenSpacesIcon);
            greenSpaces.appendChild(greenSpaces);
        }
        article.appendChild(img);
        houseDescription.appendChild(houseCharateristics);
        article.appendChild(houseDescription);
        housesSection.appendChild(article);
    });
}
