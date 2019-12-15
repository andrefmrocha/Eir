import { request } from './network.js';
import env from './env.js';
const urlParams = new URL(window.location).searchParams;

const checkin = document.querySelector('#check-in');
const checkout = document.querySelector('#check-out');
let selecting = false;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function generateYearandMonthString(date) {
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${month < 10 ? '0' + month : month}`;
}

function generateDateString(date, text) {
  return `${generateYearandMonthString(date)}-${text < 10 ? '0' + text : text}`;
}

export function updatePrice(checkin, checkout) {
  const housePrice = document.querySelector('#reserve div:nth-child(4) p:last-child strong');
  const totalPrice = document.querySelector('#reserve div:nth-child(4) p:first-child strong');
  const numDays = (new Date(checkout.value) - new Date(checkin.value)) / (1000 * 60 * 60 * 24) + 1;
  totalPrice.innerText = Number(housePrice.innerText) * numDays;
}

export async function buildCalendar(date, single) {
  selecting = false;
  const article = document.createElement('article');
  article.setAttribute('class', 'calendar');
  const title = document.createElement('div');
  const titleText = document.createElement('h5');
  title.appendChild(titleText);
  if (single) {
    const previous = document.createElement('i');
    previous.setAttribute('class', 'fa fa-chevron-left');
    const next = document.createElement('i');
    next.setAttribute('class', 'fa fa-chevron-right');
    title.insertBefore(previous, titleText);
    title.insertBefore(next, title.nextSibling);
    title.setAttribute('class', 'controllers');
  }

  article.appendChild(title);
  const table = document.createElement('table');
  article.appendChild(table);
  const tableHead = document.createElement('thead');
  const headRow = document.createElement('tr');
  table.appendChild(tableHead);
  tableHead.appendChild(headRow);
  weekDays.forEach(day => {
    const cell = document.createElement('th');
    cell.innerText = day;
    headRow.appendChild(cell);
  });

  const tableCells = [];
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      tableCells.push(cell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  const rentals = await request({
    url: `${env.host}api/house_rentals.php`,
    method: 'POST',
    content: {
      house_id: urlParams.get('id'),
      date: generateYearandMonthString(date)
    }
  });

  const month = date.getMonth();
  const year = date.getFullYear();
  titleText.innerText = `${months[month]} ${year}`;
  const numDays = new Date(year, month + 1, 0).getDate();
  let day = new Date(year, month).getDay();
  const now = new Date();
  for (let i = 1; i <= numDays; i++, day++) {
    const currentDay = `${generateYearandMonthString(date)}-${i}`;
    if (rentals.find(rental => rental.checkin <= currentDay && rental.checkout >= currentDay)) {
      tableCells[day].setAttribute('class', 'unavailable');
    } else if (now > new Date(year, month, i)) {
      tableCells[day].setAttribute('class', 'past-date unavailable');
    }
    tableCells[day].innerText = i;
  }

  if (single) {
    calendarClicks(article, date);
  }
  return article;
}

function fillSelected(start, end, table) {
  for (let j = 0; j < table.length; j++) {
    if (j >= start && j <= end) table[j].setAttribute('class', 'selected');
    else if (table[j].className != 'unavailable') table[j].removeAttribute('class');
  }
}

function fillSelectedDate(startDate, endDate, table) {
  for (let j = 0; j < table.length; j++) {
    if (table[j].innerText >= startDate && table[j].innerText <= endDate) table[j].setAttribute('class', 'selected');
    else if (table[j].className != 'unavailable') table[j].removeAttribute('class');
  }
}

function removeSelected(cells) {
  cells.forEach(day => {
    if (day.className != 'unavailable') day.removeAttribute('class');
  });
}

function calendarClicks(article, date) {
  const table = article.querySelector('table');
  const cells = table.querySelectorAll('td');
  cells.forEach((day, index) => {
    day.className.search('unavailable') == -1 &&
      day.addEventListener('click', () => {
        if (!selecting) {
          selecting = true;
          removeSelected(cells);
          day.setAttribute('class', 'selected');
          for (let i = index - 1; i >= 0; i--) {
            if (cells[i].className == 'unavailable' || cells[i].innerText == '') break;
            cells[i].addEventListener('mouseover', () => {
              fillSelected(i, index, cells);
            });

            cells[i].addEventListener('click', () => {
              const newTable = table.cloneNode(true);
              article.replaceChild(newTable, table);
              calendarClicks(article, date);
              checkout.value = generateDateString(date, day.innerText);
              checkin.value = generateDateString(date, cells[i].innerText);
              updatePrice(checkin, checkout);
              selecting = false;
            });
          }

          cells[index].addEventListener('click', () => {
            removeSelected(cells);
            const newTable = table.cloneNode(true);
            article.replaceChild(newTable, table);
            calendarClicks(article, date);
            selecting = false;
          });

          cells[index].addEventListener('mouseover', () => {
            fillSelected(index, index, cells);
          });

          for (let i = index + 1; i < cells.length; i++) {
            if (cells[i].className == 'unavailable' || cells[i].innerText == '') break;

            cells[i].addEventListener('mouseover', () => {
              fillSelected(index, i, cells);
            });

            cells[i].addEventListener('click', () => {
              const newTable = table.cloneNode(true);
              article.replaceChild(newTable, table);
              calendarClicks(article, date);
              checkin.value = generateDateString(date, day.innerText);
              checkout.value = generateDateString(date, cells[i].innerText);
              updatePrice(checkin, checkout);
              selecting = false;
            });
          }
        }
      });
  });
}

export async function validateDate(startDate, endDate, cells) {
  const unavailable = [].find.call(
    cells,
    cell =>
      cell.className == 'unavailable' && startDate.getDate() <= cell.innerText && endDate.getDate() >= cell.innerText
  );
  if (unavailable) return false;
  fillSelectedDate(startDate.getDate(), endDate.getDate(), cells);
  return true;
}
