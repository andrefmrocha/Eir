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

const housesSection =  document.querySelector('#houses');

houses.forEach(house => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = house.img;
    const houseDescription = document.createElement('div');
    const header = document.createElement('header')
    header.innerText = house.description;
    houseDescription.appendChild(header);
    const houseCharateristics = document.createElement('div');
    const houseType = document.createElement('span');
    houseType.innerText = house.houseType;
    houseCharateristics.appendChild(houseType);
    const rating = document.createElement('span');
    rating.innerText = house.rating;
    houseCharateristics.appendChild(rating);
    const numBeds = document.createElement('span');
    numBeds.innerText = `${house.numBeds} Beds`;
    houseCharateristics.appendChild(numBeds);
    const price = document.createElement('span');
    price.innerText = `${house.price}€`;
    houseCharateristics.appendChild(price);
    if(house.babyFriendly){
        const babyFriendly = document.createElement('span');
        babyFriendly.innerText = 'Baby Friendly';
        houseCharateristics.appendChild(babyFriendly);
    }
    if(house.petFriendly){
        const petFriendly = document.createElement('span');
        petFriendly.innerText = 'Pet Friendly';
        houseCharateristics.appendChild(petFriendly);
    }
    article.appendChild(img);
    houseDescription.appendChild(houseCharateristics);
    article.appendChild(houseDescription);
    housesSection.appendChild(article);
});
