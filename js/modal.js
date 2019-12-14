'use strict';

const body = document.querySelector('body');
let active_modal = false;

export default function successModal(successMessage, imageURL, continuePage) {
    if (active_modal)
        exitModal();
    
    let img = document.createElement('img');
    img.src = imageURL;

    let message = document.createElement('p');
    let text = document.createTextNode(successMessage);
    message.setAttribute('class', 'success_message');
    message.appendChild(text);

    let content = document.createElement('div');
    content.appendChild(img);

    let modal_bg = document.createElement('div');
    modal_bg.setAttribute('class', 'modal_bg');

    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');

    let leave = document.createElement('input');
    leave.setAttribute('class', 'continue');
    leave.setAttribute('type', 'submit');
    leave.setAttribute('value', 'Continue');
    leave.addEventListener('click', function(){exitModal(continuePage)});

    content.setAttribute('class', 'modal_body');

    modal.appendChild(message);
    modal.appendChild(content);
    modal.appendChild(leave);
    modal_bg.appendChild(modal);
    body.appendChild(modal_bg);

    active_modal = true;
}

function exitModal(continuePage) {
    document.querySelector('.modal_bg').remove();
    active_modal = false;

    window.location.replace(continuePage);
}