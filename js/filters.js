'use strict';

export function getActiveHouseTypes() {
  return ['hotels', 'apartments', 'beach-houses', 'vacation-homes', 'resorts']
    .map(id => document.getElementById(id))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.labels[0].innerText)
    .map(
      /* remove plural ending */
      plural => plural.substring(0, plural.length - 1)
    );
}

export function getActiveHouseTags() {
  return ['baby-friendly', 'pet-friendly', 'breakfast-included', 'green-spaces', 'swimming-pool']
    .map(id => document.getElementById(id))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.labels[0].innerText);
}

export function getActivePriceRanges() {
  return ['0-50', '50-100', '100-150', '150-200', '200-250', '250-plus'].filter(
    id => document.getElementById(id).checked
  );
}

export function getActiveHouseRatings() {
  return ['1-star', '2-star', '3-star', '4-star', '5-star']
    .filter(id => document.getElementById(id).checked)
    .map(
      // get only the number
      str => str.substring(0, 1)
    );
}

export function getActiveHouseSort() {
  let sort = null;
  document.getElementsByName('order').forEach(element => {
    if (element.checked) sort = element.id;
  });
  return sort;
}

function getPriceRangeParameters(range) {
  switch (range) {
    case '0-50':
      return { max_price: 50 };
    case '50-100':
      return { min_price: 50, max_price: 100 };
    case '100-150':
      return { min_price: 100, max_price: 150 };
    case '150-200':
      return { min_price: 150, max_price: 200 };
    case '200-250':
      return { min_price: 200, max_price: 250 };
    case '250-plus':
      return { min_price: 250 };
    default:
      return {};
  }
}

function getSortKey(sort) {
  switch (sort) {
    case 'rating-lowest':
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? -1 : h1.rating < h2.rating ? -1 : 1);
    case 'rating-highest':
      return (h1, h2) => (!h1.rating || h1.rating == 'N/A' ? 1 : h1.rating > h2.rating ? -1 : 1);
    case 'price-lowest':
      return (h1, h2) => (!h1.price_per_day ? -1 : h1.price_per_day < h2.price_per_day ? -1 : 1);
    case 'price-highest':
      return (h1, h2) => (!h1.price_per_day ? 1 : h1.price_per_day > h2.price_per_day ? -1 : 1);
    case 'popular':
      return (h1, h2) => (h1.reservation_count > h2.reservation_count ? -1 : 1);
    default:
      return (h1, h2) => -1;
  }
}
