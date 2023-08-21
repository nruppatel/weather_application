 
const apiKey = '901bda3db21d453491363514232108';  
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecastInfo');
const toggleButton = document.getElementById('toggleButton');
let isCelsius = true;

searchButton.addEventListener('click', fetchWeather);
toggleButton.addEventListener('click', toggleTemperatureUnit);

// Function to fetch weather data
async function fetchWeather() {
    const city = cityInput.value;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = alert("City entered by you is incorrect please check it again ");
            forecastInfo.innerHTML = '';
        }
    } catch (error) {
        weatherInfo.innerHTML = alert("oops! error occoured please try again after some time, thank you");;
        forecastInfo.innerHTML = '';
    }
}

// Function to display weather data
function displayWeather(data) {
    const currentWeather = data.current;
    const forecast = data.forecast.forecastday;

    weatherInfo.innerHTML = `
        <h2>Weather in ${data.location.name}</h2>
        <p>Temperature: ${isCelsius ? currentWeather.temp_c : currentWeather.temp_f}°${isCelsius ? 'C' : 'F'}</p>
        <p>Condition: ${currentWeather.condition.text}</p>
        <img src="${currentWeather.condition.icon}" alt="${currentWeather.condition.text}">
    `;

    forecastInfo.innerHTML = '<h2>3-Day Forecast</h2>';
    forecast.forEach(day => {
        forecastInfo.innerHTML += `
            <div class="forecast-day">
                <p>${day.date}</p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>${isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f}°${isCelsius ? 'C' : 'F'}</p>
            </div>
        `;
    });
}

// Function to convert temperature unit
function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    fetchWeather();
}
