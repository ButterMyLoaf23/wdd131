function getForecast(city) {
    const apiKey = '1cfb34bfbc53fcd3c4364497cb26ff4b';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '';

            const location = `${data.city.name}, ${data.city.country}`;
            const locationHTML = `<h2>Weather Forecast for ${location}</h2>`;
            forecastDiv.innerHTML += locationHTML;

            const filteredData = data.list.filter((item, index) => index % 8 === 0);

            filteredData.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                const temp = item.main.temp;
                const description = item.weather[0].description;
                const icon = item.weather[0].icon;
                const forecastHTML = `
                    <div class="forecast">
                        <h2>${location}</h2>
                        <h2>${date}</h2>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        <p>Temp: ${temp}°F</p>
                        <p>Condition: ${description}</p>
                    </div>
                `;
                forecastDiv.innerHTML += forecastHTML;
            });
        })
        .catch(() => {
            document.getElementById('forecast').innerText = 'Error fetching forecast data.';
        });
}
function searchCity() {
    const cityState = document.getElementById('searchCity').value.trim(); // Get the value from the input
    if (cityState) {
        getForecast(cityState); // Fetch forecast for the entered city, state
    } else {
        alert("Please enter both the city and state.");
    }
}

getForecast('Phoenix');
