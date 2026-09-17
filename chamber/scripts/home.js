// Benin City: 6.3350° N, 5.6037° E
const lat = 6.33;
const lon = 5.60;
const apiKey = 'f64b5c679d24d4a04f0b3f5c4243570e';

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const humiditySpan = document.querySelector('#humidity');
const forecastDiv = document.querySelector('#forecast');

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        }
        const response2 = await fetch(forecastUrl);
        if (response2.ok) {
            const data2 = await response2.json();
            displayForecast(data2);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = data.weather[0].description;
    humiditySpan.textContent = `${data.main.humidity}%`;
}

function displayForecast(data) {
    // 3 days - filter noon
    const threeDay = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>' + threeDay.map(day => {
        const date = new Date(day.dt_txt);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `<p>${weekday}: ${Math.round(day.main.temp)}°C</p>`;
    }).join('');
}

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        const members = data.members || data;

        // Filter Gold/Silver - handles both number and string
        const filtered = members.filter(m => {
            const lvl = String(m.membership).toLowerCase();
            return lvl == '3' || lvl == '2' || lvl == 'gold' || lvl == 'silver' || lvl == '2 - silver' || lvl == '3 - gold';
        });

        const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

        document.querySelector('#spotlight-cards').innerHTML = shuffled.map(m => `
      <section class="spotlight-card">
        <h3>${m.name}</h3>
        <img src="${m.image || m.icon || 'images/logo.png'}" alt="${m.name}" loading="lazy" width="100" height="100">
        <p>${m.address || ''}</p>
        <p>${m.phone || ''}</p>
        <p><a href="${m.website}" target="_blank">${m.website || 'Visit Website'}</a></p>
        <p><strong>${m.membership == 3 || String(m.membership).toLowerCase().includes('gold') ? 'Gold' : 'Silver'} Member</strong></p>
      </section>
    `).join('');
    } catch (e) { console.log(e); }
}

apiFetch();
getSpotlights();