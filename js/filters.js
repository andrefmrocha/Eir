'use strict';

export function getActiveHouseTypes() {
  return ['hotels', 'apartments', 'beach-houses', 'vacation-homes', 'resorts']
    .map(id => document.getElementById(id))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.labels[0].innerHTML)
    .map(
      /* remove plural ending */
      plural => plural.substring(0, plural.length - 1)
    );
}

export function getActiveHouseTags() {
  return ['baby-friendly', 'pet-friendly', 'breakfast-included', 'green-spaces', 'swimming-pool']
    .map(id => document.getElementById(id))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.labels[0].innerHTML);
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
