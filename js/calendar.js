import { request } from './network.js';
import env from './env.js'
const urlParams = new URL(window.location).searchParams;

const calendar = document.querySelector('.calendar');
const monthText = calendar.querySelector('div > h5');
const previous = calendar.querySelector('.fa-chevron-left');
const next = calendar.querySelector('.fa-chevron-right');

const calendarTable = calendar.querySelectorAll('td');
const months = ["January", "February", "March",
    "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();

function generateYearandMonthString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}`
}

let start, end;

async function buildCalendar(date) {
    calendarTable.forEach(value => {
        value.innerText = '';
        value.removeAttribute('class', 'unavailable');
    });
    if (date) currentDate = date;
    const rentals = await request({
        url: `${env.host}api/house_rentals.php`,
        method: 'POST',
        content: {
            house_id: urlParams.get('id'),
            date: generateYearandMonthString(currentDate)
        }
    });

    console.log(rentals);
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthText.innerText = `${months[month]} ${year}`
    const numDays = (new Date(year, month + 1, 0)).getDate();
    let day = (new Date(year, month)).getDay();
    for (let i = 1; i <= numDays; i++ , day++) {
        const currentDay = `${generateYearandMonthString(currentDate)}-${i}`;
        if (rentals.find(rental => rental.checkin <= currentDay && rental.checkout >= currentDay)) {
            calendarTable[day].setAttribute('class', 'unavailable');
        }
        calendarTable[day].innerText = i;
    }
}

buildCalendar();

previous.addEventListener('click', () =>
    buildCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)));

next.addEventListener('click', () =>
    buildCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)));

const listeners = {};


function initialClickListener(day, index) {
    const func = () => {
        start = day.innerText;
        for (let i = index + 1; i < calendarTable.length; i++) {
            console.log(listeners[calendarTable[i]]);
            if (calendarTable[i].className == "unavailable") break;
            calendarTable[i].removeEventListener('click', listeners[calendarTable[i]]);

            calendarTable[i].addEventListener('mouseover', () => {
                for (let j = index + 1; j <= i; j++) {
                    calendarTable[j].setAttribute('class', 'selected');
                }
            });

            calendarTable[i].addEventListener('click', () => {
                end = calendarTable[i].innerText;
                console.log(day.innerText);
                console.log(end);
            });
        }
    }
    return func;
}


calendarTable.forEach((day, index) => {
    const listener = initialClickListener(day, index);
    listeners[day] = listener;
    day.addEventListener('click', listener);
});