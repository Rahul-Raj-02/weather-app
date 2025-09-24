document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const weatherDisplay = document.getElementById('weather-display');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    searchButton.addEventListener('click', () => {
        const city = searchInput.value;
         if (city) { 
            getWeather(city);
        }
    })
     searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const city = searchInput.value;
            if (city) {
                getWeather(city);
            }
        }
    });

    async function getWeather(city){
        const apiUrl = `https://wttr.in/${city}?format=j1`;
        try{
            const res = await fetch(apiUrl)
            if (!res.ok) {
                throw new Error('Sorry, city not found!');
            }
            const data = await res.json()
            displayWeather(data);
        } catch (err){
            alert(err.message);
        }
    }

    function displayWeather(data) {
        cityName.textContent = data.nearest_area[0].areaName[0].value;
        temperature.textContent = `${data.current_condition[0].temp_C}°C`;
        description.textContent = data.current_condition[0].weatherDesc[0].value;
        weatherDisplay.classList.remove('d-none');
    }
});