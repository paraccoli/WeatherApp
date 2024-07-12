let currentLanguage = 'en';
let currentUnit = 'celsius';

function createWeatherCard(city, weather) {
    return `
        <div class="weather-card">
            <h3>${city}</h3>
            <img class="weather-icon" src="http://openweathermap.org/img/w/${weather.icon}.png" alt="Weather icon">
            <p class="temperature">${formatTemperature(weather.temperature)}</p>
            <p class="description">${weather.description}</p>
            <button onclick="getForecast('${city}')">${translations[currentLanguage].getForecast}</button>
            <button onclick="addToFavorites('${city}')">${translations[currentLanguage].addToFavorites}</button>
        </div>
    `;
}

function formatTemperature(temp) {
    const unit = currentUnit === 'fahrenheit' ? '°F' : '°C';
    return `${convertTemperature(temp).toFixed(1)}${unit}`;
}

function getJapanWeather() {
    fetch(`http://localhost:5000/japan-weather?lang=${currentLanguage}`)
        .then(response => response.json())
        .then(data => {
            const weatherGrid = document.getElementById('japan-weather');
            weatherGrid.innerHTML = Object.entries(data)
                .map(([city, weather]) => createWeatherCard(city, weather))
                .join('');
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('japan-weather').innerHTML = `<p>${translations[currentLanguage].fetchError}</p>`;
        });
}

function getLocalWeather(latitude, longitude) {
    fetch(`http://localhost:5000/weather?lat=${latitude}&lon=${longitude}&lang=${currentLanguage}`)
        .then(response => response.json())
        .then(data => {
            const localWeather = document.getElementById('local-weather');
            localWeather.innerHTML = createWeatherCard(data.city, data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('local-weather').innerHTML = `<p>${translations[currentLanguage].localWeatherError}</p>`;
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                getLocalWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                console.error('Geolocation error:', error);
                document.getElementById('local-weather').innerHTML = `<p>${translations[currentLanguage].geolocationError}</p>`;
            }
        );
    } else {
        document.getElementById('local-weather').innerHTML = `<p>${translations[currentLanguage].geolocationNotSupported}</p>`;
    }
}

function searchCity() {
    const city = document.getElementById('city-search').value;
    fetch(`http://localhost:5000/search?city=${city}&lang=${currentLanguage}`)
    .then(data => {
        const searchResults = document.getElementById('search-results');
        if (data.error) {
            searchResults.innerHTML = `<p>${translations[currentLanguage].cityNotFound}</p>`;
        } else {
            searchResults.innerHTML = createWeatherCard(data.city, data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('search-results').innerHTML = `<p>${translations[currentLanguage].searchError}</p>`;
    });
}

function updateLanguage() {
currentLanguage = document.getElementById('language-selector').value;
document.getElementById('main-title').textContent = translations[currentLanguage].mainTitle;
document.getElementById('japan-title').textContent = translations[currentLanguage].japanTitle;
document.getElementById('local-title').textContent = translations[currentLanguage].localTitle;
document.getElementById('search-title').textContent = translations[currentLanguage].searchTitle;
document.getElementById('forecast-title').textContent = translations[currentLanguage].forecastTitle;
document.getElementById('favorites-title').textContent = translations[currentLanguage].favoritesTitle;
document.getElementById('city-search').placeholder = translations[currentLanguage].searchPlaceholder;
document.getElementById('search-button').textContent = translations[currentLanguage].searchButton;
getJapanWeather();
getLocation();
updateFavoritesList();
}

function convertTemperature(temp) {
if (currentUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
}
return temp;
}

function updateTemperatureUnit() {
currentUnit = document.querySelector('input[name="unit"]:checked').value;
updateAllTemperatures();
}

function updateAllTemperatures() {
const tempElements = document.querySelectorAll('.temperature');
tempElements.forEach(el => {
    const temp = parseFloat(el.textContent);
    el.textContent = formatTemperature(temp);
});
}

function getForecast(city) {
fetch(`http://localhost:5000/forecast?city=${city}&lang=${currentLanguage}`)
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = data.map(item => `
            <div class="forecast-item">
                <p>${new Date(item.date).toLocaleDateString(currentLanguage, {weekday: 'short', month: 'short', day: 'numeric'})}</p>
                <img src="http://openweathermap.org/img/w/${item.icon}.png" alt="Weather icon">
                <p class="temperature">${formatTemperature(item.temperature)}</p>
                <p>${item.description}</p>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('forecast').innerHTML = `<p>${translations[currentLanguage].forecastError}</p>`;
    });
}

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function addToFavorites(city) {
if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
}
}

function removeFromFavorites(city) {
favorites = favorites.filter(fav => fav !== city);
localStorage.setItem('favorites', JSON.stringify(favorites));
updateFavoritesList();
}

function updateFavoritesList() {
const favoritesList = document.getElementById('favorites-list');
favoritesList.innerHTML = favorites.map(city => `
    <li>
        ${city}
        <div>
            <button onclick="getForecast('${city}')">${translations[currentLanguage].getForecast}</button>
            <button onclick="removeFromFavorites('${city}')">${translations[currentLanguage].remove}</button>
        </div>
    </li>
`).join('');
}

document.getElementById('language-selector').addEventListener('change', updateLanguage);
document.getElementById('search-button').addEventListener('click', searchCity);
document.querySelectorAll('input[name="unit"]').forEach(input => {
input.addEventListener('change', updateTemperatureUnit);
});

// 初期化関数
function init() {
updateFavoritesList();
getJapanWeather();
getLocation();
updateLanguage();
}

init();