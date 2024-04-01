const btn = document.querySelector('button');
const input = document.querySelector("#cityInput"); 
const city = document.querySelector("#city");
const wind = document.querySelector(".wind h3");
const humidity = document.querySelector(".humidity h3");
const temp = document.querySelector("#temp");
const ico = document.querySelector(".icon");
const img = document.createElement("img");

// Fetch weather data function
async function fetchWeather(cityName) {
    const apiKey = "6c8cb663ad8a4d5e9dc172838243103"; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        city.textContent = `${data.location.name.toUpperCase()}, ${data.location.country.toUpperCase()}`;
        wind.textContent = `${data.current.wind_kph} Kph`;
        humidity.textContent = data.current.humidity;
        temp.textContent = `${data.current.temp_c} °C`;
        
        img.src = `https:${data.current.condition.icon}`;
        ico.innerHTML = ''; 
        ico.appendChild(img);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}


btn.addEventListener('click', async (event) => {
    event.preventDefault();
    const cityName = input.value.trim();
    if (cityName === "") {
        alert("Please enter a city name.");
        return; 
    }
    
    fetchWeather(cityName);
});

// Fetch weather for default city on page load
window.addEventListener('load', () => {
    const defaultCityName = input.value.trim();
    fetchWeather(defaultCityName);
});
