const houses = [
    {
        description: 'Cute house near the beach',
        houseType: 'Entire House',
        rating:'4.7',
        price: 350,
        petFriendly: true,
        numBeds: 4,
        img: '../assets/house-1.jpg'
    },
    {
        description: 'Dream southern cottage',
        houseType: 'Main House',
        rating:'4.2',
        price: 220,
        babyFriendly: true,
        numBeds: 3,
        img: '../assets/house-2.jpg'
    },
]

function generateIcons(){
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
    return {
        houseIcon,
        starIcon,
        bedIcon,
        moneyIcon,
        petIcon,
        babyIcon,
        swimmingPoolIcon
    }
}


const housesSection =  document.querySelector('#houses');

houses.forEach(house => {
    const icons = generateIcons();
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = house.img;
    const houseDescription = document.createElement('div');
    const header = document.createElement('header')
    header.innerText = house.description;
    houseDescription.appendChild(header);
    const houseCharateristics = document.createElement('div');
    const houseType = document.createElement('span');
    houseType.appendChild(icons.houseIcon);
    const houseTypeText = document.createElement('span');
    houseTypeText.innerText = house.houseType;
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
    numBedsText.innerText = `${house.numBeds} Beds`;
    numBeds.appendChild(icons.bedIcon);
    numBeds.appendChild(numBedsText);
    houseCharateristics.appendChild(numBeds);
    const price = document.createElement('span');
    const priceText = document.createElement('span');
    priceText.innerText = `${house.price}€`;
    price.appendChild(priceText);
    price.appendChild(icons.moneyIcon);
    houseCharateristics.appendChild(price);
    if(house.babyFriendly){
        const babyFriendly = document.createElement('span');
        const babyFriendlyText = document.createElement('span');
        babyFriendlyText.innerText = 'Baby Friendly';
        babyFriendly.appendChild(icons.babyIcon);
        babyFriendly.appendChild(babyFriendlyText);
        houseCharateristics.appendChild(babyFriendly);
    }
    if(house.petFriendly){
        const petFriendly = document.createElement('span');
        const petFriendlyText = document.createElement('span');
        petFriendlyText.innerText = 'Pet Friendly';
        petFriendly.appendChild(icons.petIcon);
        petFriendly.appendChild(petFriendlyText);
        houseCharateristics.appendChild(petFriendly);
    }
    if(house.swimmingPool){
        const swimmingPool = document.createElement('span');
        const swimmingPoolText = document.createElement('span');
        swimmingPoolText.innerText = 'Swimming Pool';
        swimmingPool.appendChild(icons.swimmingPoolIcon);
        swimmingPool.appendChild(swimmingPoolText);
    }
    article.appendChild(img);
    houseDescription.appendChild(houseCharateristics);
    article.appendChild(houseDescription);
    housesSection.appendChild(article);
});
