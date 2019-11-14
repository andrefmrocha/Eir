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

function getIcon(iconName) {
    const icon = document.createElement('i');
    icon.setAttribute('class', `fas fa-lg ${iconName}`);
    return icon;
}

function generateIcons() {
    const houseIcon = getIcon('fa-home');
    const starIcon = getIcon('fa-star');
    const bedIcon = getIcon('fa-bed');
    const moneyIcon = getIcon('fa-money-bill-wave');
    const petIcon = getIcon('fa-paw');
    const babyIcon = getIcon('fa-baby');
    const swimmingPoolIcon = getIcon('fa-swimming-pool');
    const breakfastIcon = getIcon('fa-utensils');
    const greenSpacesIcon = getIcon('fa-seedling');
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



function createOptionalTag(tagText, icon){
    const tag = document.createElement('span');
    const tagSpan = document.createElement('span');
    tagSpan.innerText = tagText;
    tag.appendChild(icon);
    tag.appendChild(tagSpan);
    return tag;
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
            houseCharateristics.appendChild(createOptionalTag('Baby Friendly', icons.babyIcon));
        }
        if (house.tags.indexOf('Pet Friendly') != -1) {        
            houseCharateristics.appendChild(createOptionalTag('Pet Friendly', icons.petIcon));
        }
        if (house.tags.indexOf('Swimming Pool') != -1) {
            houseCharateristics.appendChild(createOptionalTag('Swimming Pool', icons.swimmingPoolIcon));
        }
        if (house.tags.indexOf('Breakfast Included') != -1) {
            houseCharateristics.appendChild(createOptionalTag('Breakfast Included', icons.breakfastIcon));
        }
        if (house.tags.indexOf('Green Spaces') != -1) {
            houseCharateristics.appendChild(createOptionalTag('Green Spaces', icons.greenSpacesIcon));
        }
        article.appendChild(img);
        houseDescription.appendChild(houseCharateristics);
        article.appendChild(houseDescription);
        housesSection.appendChild(article);
    });
}
