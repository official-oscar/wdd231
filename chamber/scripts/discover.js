import { places } from '../data/places.mjs';

const grid = document.querySelector('#discover-grid');

places.forEach(place => {
    const card = document.createElement('section');
    card.classList.add('discover-card');
    card.style.gridArea = place.id;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;
    grid.appendChild(card);
});

// localStorage Visit Message
const messageEl = document.querySelector('#visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysDiff = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 1) {
        messageEl.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
        messageEl.textContent = `You last visited 1 day ago.`;
    } else {
        messageEl.textContent = `You last visited ${daysDiff} days ago.`;
    }
}

localStorage.setItem('lastVisit', now.toString());