import { request } from './network.js';
import env from './env.js';
const urlParams = new URL(window.location).searchParams;

const calendar = document.querySelector('.calendar');
let fullTable = calendar.querySelector('table');
const monthText = calendar.querySelector('div > h5');
const previous = calendar.querySelector('.fa-chevron-left');
const next = calendar.querySelector('.fa-chevron-right');

const checkin = document.querySelector('#check-in');
const checkout = document.querySelector('#check-out');

const calendarTable = {
  date: new Date(),
  table: calendar.querySelectorAll('td')
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

async function buildCalendar(date) {
  const table = calendarTable.table;

  table.forEach(value => {
    value.innerText = '';
    value.removeAttribute('class', 'unavailable');
  });
  if (date) calendarTable.date = date;
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
  for (let i = 1; i <= numDays; i++, day++) {
    const currentDay = `${generateYearandMonthString(calendarTable.date)}-${i}`;
    if (rentals.find(rental => rental.checkin <= currentDay && rental.checkout >= currentDay)) {
      table[day].setAttribute('class', 'unavailable');
    }
    table[day].innerText = i;
  }
}

buildCalendar();

previous.addEventListener('click', () =>
  buildCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
);

next.addEventListener('click', () => buildCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)));

function calendarClicks() {
  const table = calendarTable.table;
  table.forEach((day, index) => {
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
            for (let j = index + 1; j < table.length; j++) {
              if (j <= i) table[j].setAttribute('class', 'selected');
              else if (table[j].className == 'unavailable') break;
              else table[j].removeAttribute('class');
            }
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

calendarClicks(calendarTable);
