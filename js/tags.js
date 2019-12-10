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

function generateInformation(textInfo, icon, reversed) {
  const node = document.createElement('span');
  const text = document.createElement('span');
  text.innerText = textInfo;
  if (reversed) {
    node.appendChild(text);
    node.appendChild(icon);
  } else {
    node.appendChild(icon);
    node.appendChild(text);
  }
  return node;
}

export function createHouseTags(node, house) {
  const icons = generateIcons();
  node.appendChild(generateInformation(house.name, icons.houseIcon));
  node.appendChild(generateInformation(house.rating, icons.starIcon, true));
  node.appendChild(generateInformation(`${house.max_guest_number} Beds`, icons.bedIcon));
  node.appendChild(generateInformation(`${house.price_per_day}€`, icons.moneyIcon, true));

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

export function createTrashIcon() {
  const icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-trash');
  return icon;
}

function createDeletableTag(tagText, icon) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(createOptionalTag(tagText, icon));
  wrapper.appendChild(createTrashIcon());
  return wrapper;
}

export function createHouseInformation(node, house) {
  const icons = generateIcons();
  node.appendChild(generateInformation(house.name, icons.houseIcon));
  node.appendChild(generateInformation(`${house.max_guest_number} Beds`, icons.bedIcon));

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

export function createHouseDetails(node, house) {
  const icons = generateIcons();
  node.appendChild(generateInformation(house.type, icons.houseIcon));
  node.appendChild(generateInformation(`${house.max_guest_number} Beds`, icons.bedIcon));

  if (house.tags.indexOf('Baby Friendly') != -1) {
    node.appendChild(createDeletableTag('Baby Friendly', icons.babyIcon));
  }
  if (house.tags.indexOf('Pet Friendly') != -1) {
    node.appendChild(createDeletableTag('Pet Friendly', icons.petIcon));
  }
  if (house.tags.indexOf('Swimming Pool') != -1) {
    node.appendChild(createDeletableTag('Swimming Pool', icons.swimmingPoolIcon));
  }
  if (house.tags.indexOf('Breakfast Included') != -1) {
    node.appendChild(createDeletableTag('Breakfast Included', icons.breakfastIcon));
  }
  if (house.tags.indexOf('Green Spaces') != -1) {
    node.appendChild(createDeletableTag('Green Spaces', icons.greenSpacesIcon));
  }
}

export function buildTag(tag) {
  const icons = generateIcons();

  switch (tag) {
    case 'Baby Friendly':
      return createDeletableTag('Baby Friendly', icons.babyIcon);
    case 'Pet Friendly':
      return createDeletableTag('Pet Friendly', icons.petIcon);
    case 'Swimming Pool':
      return createDeletableTag('Swimming Pool', icons.swimmingPoolIcon);
    case 'Breakfast Included':
      return createDeletableTag('Breakfast Included', icons.breakfastIcon);
    case 'Green Spaces':
      return createDeletableTag('Green Spaces', icons.greenSpacesIcon);
  }
}
