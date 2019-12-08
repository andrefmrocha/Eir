import { request } from './network.js';
import env from './env.js';
const urlParams = new URL(window.location).searchParams;

const calendar = document.querySelector('.calendar');
let fullTable = calendar.querySelector('table');
const monthText = calendar.querySelector('div > h5');
const monthTitle = calendar.querySelector('div');

const checkin = document.querySelector('#check-in');
const checkout = document.querySelector('#check-out');
const tr = calendar.querySelectorAll('tbody tr');

const calendarTable = {
  date: new Date(),
  table: []
};
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

function generateYearandMonthString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

function generateDateString(date, text) {
  return `${generateYearandMonthString(date)}-${text < 10 ? '0' + text : text}`;
}

export async function buildCalendar(date, controllers) {
  if (date) calendarTable.date = date;

  calendarTable.table = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      tr[i].removeChild(tr[i].firstElementChild);
      const cell = document.createElement('td');
      tr[i].appendChild(cell);
      calendarTable.table.push(cell);
    }
  }

  if (controllers) {
    const previous = document.createElement('i');
    previous.setAttribute('class', 'fa fa-chevron-left');
    const next = document.createElement('i');
    next.setAttribute('class', 'fa fa-chevron-right');
    while (monthTitle.firstElementChild) {
      monthTitle.removeChild(monthTitle.firstElementChild);
    }
    monthTitle.appendChild(previous);
    monthTitle.appendChild(monthText);
    monthTitle.appendChild(next);
    monthTitle.setAttribute('class', 'controllers')
    previous.addEventListener('click', () =>
      buildCalendar(new Date(calendarTable.date.getFullYear(), calendarTable.date.getMonth() - 1), true)
    );

    next.addEventListener('click', () =>
     buildCalendar(new Date(calendarTable.date.getFullYear(), calendarTable.date.getMonth() + 1), true));

  }

  const table = calendarTable.table;

  table.forEach(value => {
    value.innerText = '';
    value.removeAttribute('class', 'unavailable');
  });
  const rentals = await request({
    url: `${env.host}api/house_rentals.php`,
    method: 'POST',
    content: {
      house_id: urlParams.get('id'),
      date: generateYearandMonthString(calendarTable.date)
    }
  });

  const month = calendarTable.date.getMonth();
  const year = calendarTable.date.getFullYear();
  monthText.innerText = `${months[month]} ${year}`;
  const numDays = new Date(year, month + 1, 0).getDate();
  let day = new Date(year, month).getDay();
  const now = new Date().getDate();
  for (let i = 1; i <= numDays; i++ , day++) {
    const currentDay = `${generateYearandMonthString(calendarTable.date)}-${i}`;
    if (now > day || rentals.find(rental => rental.checkin <= currentDay && rental.checkout >= currentDay)) {
      table[day].setAttribute('class', 'unavailable');
    }
    table[day].innerText = i;
  }
  calendarClicks(calendarTable);
}


function fillSelected(start, end) {
  const table = calendarTable.table;
  for (let j = 0; j < table.length; j++) {
    if (j >= start && j <= end) table[j].setAttribute('class', 'selected');
    else if (table[j].className != 'unavailable') table[j].removeAttribute('class');
  }
}

function calendarClicks() {
  const table = calendarTable.table;
  table.forEach((day, index) => {
    day.className != 'unavailable' &&
      day.addEventListener('click', () => {
        if (!calendarTable.selecting) {
          calendarTable.selecting = true;
          table.forEach(day => {
            if (day.className != 'unavailable') day.removeAttribute('class');
          });
          day.setAttribute('class', 'selected');
          for (let i = index + 1; i < table.length; i++) {
            if (table[i].className == 'unavailable') break;

            table[i].addEventListener('mouseover', () => {
              fillSelected(index, i);
            });

            table[i].addEventListener('click', () => {
              const newTable = fullTable.cloneNode(true);
              calendar.replaceChild(newTable, fullTable);
              fullTable = newTable;
              calendarTable.table = newTable.querySelectorAll('td');
              calendarClicks();
              checkin.value = generateDateString(calendarTable.date, day.innerText);
              checkout.value = generateDateString(calendarTable.date, table[i].innerText);
              calendarTable.selecting = false;
            });
          }
        }
      });
  });
}

export async function validateDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  await buildCalendar(startDate);
  const unavailable = [].find.call(
    calendarTable.table,
    cell =>
      cell.className == 'unavailable' && startDate.getDate() <= cell.innerText && endDate.getDate() >= cell.innerText
  );
  if (unavailable) return false;
  fillSelected(startDate.getDate() - 1, endDate.getDate() - 1);
  return true;
}
