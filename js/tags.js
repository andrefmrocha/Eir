'use strict';

export function getIcon(iconName) {
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
  };
}

function createOptionalTag(tagText, icon) {
  const tag = document.createElement('span');
  const tagSpan = document.createElement('span');
  tagSpan.innerText = tagText;
  tag.appendChild(icon);
  tag.appendChild(tagSpan);
  return tag;
}

export function createHouseTags(node, house) {
  const icons = generateIcons();
  const houseType = document.createElement('span');
  houseType.appendChild(icons.houseIcon);
  const houseTypeText = document.createElement('span');
  houseTypeText.innerText = house.name;
  houseType.appendChild(houseTypeText);
  node.appendChild(houseType);
  const rating = document.createElement('span');
  const ratingText = document.createElement('span');
  ratingText.innerText = house.rating;
  rating.appendChild(ratingText);
  rating.appendChild(icons.starIcon);
  node.appendChild(rating);
  const numBeds = document.createElement('span');
  const numBedsText = document.createElement('span');
  numBedsText.innerText = `${house.max_guest_number} Beds`;
  numBeds.appendChild(icons.bedIcon);
  numBeds.appendChild(numBedsText);
  node.appendChild(numBeds);
  const price = document.createElement('span');
  const priceText = document.createElement('span');
  priceText.innerText = `${house.price_per_day}€`;
  price.appendChild(priceText);
  price.appendChild(icons.moneyIcon);
  node.appendChild(price);
  if (house.tags.indexOf('Baby Friendly') != -1) {
    node.appendChild(createOptionalTag('Baby Friendly', icons.babyIcon));
  }
  if (house.tags.indexOf('Pet Friendly') != -1) {
    node.appendChild(createOptionalTag('Pet Friendly', icons.petIcon));
  }
  if (house.tags.indexOf('Swimming Pool') != -1) {
    node.appendChild(createOptionalTag('Swimming Pool', icons.swimmingPoolIcon));
  }
  if (house.tags.indexOf('Breakfast Included') != -1) {
    node.appendChild(createOptionalTag('Breakfast Included', icons.breakfastIcon));
  }
  if (house.tags.indexOf('Green Spaces') != -1) {
    node.appendChild(createOptionalTag('Green Spaces', icons.greenSpacesIcon));
  }
}
