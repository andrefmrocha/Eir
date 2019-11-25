const form = document.querySelector('form');

form.addEventListener('submit', ev => {
    const checkIn = form.querySelector('#check-in');
    const checkOut = form.querySelector('#check-out');
    const people = form.querySelector('#people');
    if(checkOut.value < checkIn.value){
        ev.preventDefault();
        const error = form.querySelector('#date-input');
        error.setAttribute('class', 'form-error active');
    }
    if(Number(people.value) <= 0){
        ev.preventDefault();
        const error = form.querySelector('#people-input');
        error.setAttribute('class', 'form-error active');
    }
});