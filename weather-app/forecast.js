const apiKey = '1cfb34bfbc53fcd3c4364497cb26ff4b'; // Your API key

const stateAbbreviations = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};

// Reverse lookup for state codes
const stateCodes = Object.fromEntries(Object.entries(stateAbbreviations).map(([full, abbr]) => [abbr, full]));

function getCityLocation(city, regionInput) {
    let region = regionInput;
    if (stateCodes[regionInput.toUpperCase()]) {
        region = stateCodes[regionInput.toUpperCase()];
    }
    
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${region},US&limit=5&appid=${apiKey}`;
    
    return fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) throw new Error("Invalid location");
            
            let location = data.find(loc => loc.state?.toLowerCase() === region.toLowerCase() || loc.country.toLowerCase() === region.toLowerCase());
            if (!location) location = data[0];
            
            return {
                city: location.name,
                state: location.state || '',
                country: location.country,
                lat: location.lat,
                lon: location.lon
            };
        });
}

// Function to fetch and display the forecast
function getForecast(city, region) {
    getCityLocation(city, region)
        .then(locationData => {
            const { city, state, country, lat, lon } = locationData;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
            
            return fetch(forecastUrl)
                .then(response => response.json())
                .then(data => ({ data, locationData }));
        })
        .then(({ data, locationData }) => {
            const { city, state, country } = locationData;
            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = ''; // Clear previous results

            const locationHTML = `<h2>Weather Forecast for ${city}${state ? ', ' + state : ''}, ${country}</h2>`;
            forecastDiv.innerHTML += locationHTML;

            const filteredData = data.list.filter((item, index) => index % 8 === 0);

            filteredData.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                const temp = item.main.temp;
                const description = item.weather[0].description;
                const icon = item.weather[0].icon;

                const forecastHTML = `
                    <div class="forecast">
                        <h3>${date}</h3>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        <p>Temp: ${temp}°F</p>
                        <p>Condition: ${description}</p>
                    </div>
                `;
                forecastDiv.innerHTML += forecastHTML;
            });
        })
        .catch(() => {
            document.getElementById('forecast').innerText = 'Error fetching forecast data. Please ensure the location is correct.';
        });
}

// Function to handle search input
function searchCity() {
    const input = document.getElementById('searchCity').value.trim();
    if (!input) {
        alert("Please enter a city and country/state.");
        return;
    }

    const parts = input.split(",");
    if (parts.length < 2) {
        alert("Please enter both city and country/state (e.g., Tokyo, Japan or Paris, France).");
        return;
    }
    
    const city = parts[0].trim();
    const region = parts[1].trim();
    
    getForecast(city, region);
}

// Load default forecast for Phoenix, AZ, USA
getForecast('Phoenix', 'AZ');
