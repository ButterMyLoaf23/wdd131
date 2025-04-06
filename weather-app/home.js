const apiKey = '1cfb34bfbc53fcd3c4364497cb26ff4b';

const stateAbbreviations = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO",
    "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
    "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA",
    "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
    "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
    "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
    "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA",
    "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};
const stateCodes = Object.fromEntries(Object.entries(stateAbbreviations).map(([name, abbr]) => [abbr, name]));

function getWeather() {
    const input = document.getElementById("cityInput").value.trim();

    if (!input) {
        alert("Please enter a location.");
        return;
    }

    const parts = input.split(",");
    const city = parts[0].trim();
    let region = parts[1] ? parts[1].trim() : "";
    let country = parts[2] ? parts[2].trim() : "";

    if (region) {
        if (stateAbbreviations[region]) {
            region = stateAbbreviations[region];
            country = "US";
        } else if (stateCodes[region.toUpperCase()]) {
            region = region.toUpperCase();
            country = "US";
        }
    }

    let locationQuery = city;
    if (region) locationQuery += `,${region}`;
    if (country) locationQuery += `,${country}`;

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationQuery)}&limit=1&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length === 0) throw new Error("Location not found");

            const { name: cityName, state, country, lat, lon } = geoData[0];

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            return fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => ({ weatherData, cityName, state, country }));
        })
        .then(({ weatherData, cityName, state, country }) => {
            const weatherDiv = document.getElementById("weather");
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const windSpeed = weatherData.wind.speed;
            const icon = weatherData.weather[0].icon;
            const date = new Date().toLocaleDateString();

            weatherDiv.innerHTML = `
                <h2>Current Weather for ${cityName}${state ? ', ' + state : ''}, ${country}</h2>
                <div class="forecast">
                    <h3>${date}</h3>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                    <p><strong>Temperature:</strong> ${temp} °F</p>
                    <p><strong>Condition:</strong> ${description}</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
                </div>
            `;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = `<p>Error fetching weather data.</p>`;
            console.error(error);
        });
}


document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

