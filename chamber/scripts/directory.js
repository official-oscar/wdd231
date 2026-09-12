const url = 'data/members.json';
const cards = document.querySelector('#cards');

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

const displayMembers = (companies) => {
    cards.innerHTML = "";
    companies.forEach((company) => {
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let image = document.createElement('img');

        name.textContent = company.name;
        address.textContent = company.address;
        phone.textContent = company.phone;
        website.textContent = company.website;
        website.setAttribute('href', company.website);
        website.setAttribute('target', '_blank');
        image.setAttribute('src', `images/${company.image}`);
        image.setAttribute('alt', `Logo of ${company.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '100');
        image.setAttribute('height', '100');

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        cards.appendChild(card);
    });
}

// Grid / List Toggle
document.querySelector("#grid").addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// Hamburger Menu
document.querySelector('#menu-button').addEventListener('click', () => {
    document.querySelector('#navigation').classList.toggle('open');
});

getMembers();

// Footer dates - Required by audit
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;