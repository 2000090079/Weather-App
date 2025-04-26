const apiKey = "b1b400f3af384d69876161043252504";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + "&aqi=no");

        // Check for a successful response (status 200)
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Log the data to the console for debugging
        console.log(data);

        // Check if the necessary data exists
        if (data && data.current && data.location) {
            document.querySelector(".city").innerHTML = data.location.name;
            document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
            document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
            document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

            // Set the correct weather icon based on the weather condition
            const weatherCondition = data.current.condition.text;
            if (weatherCondition.includes("Cloud")) {
                weatherIcon.src = "images/clouds.png";
            } else if (weatherCondition.includes("Clear")) {
                weatherIcon.src = "images/clear.png";
            } else if (weatherCondition.includes("Rain")) {
                weatherIcon.src = "images/rain.png";
            } else if (weatherCondition.includes("Drizzle")) {
                weatherIcon.src = "images/drizzle.png";
            } else if (weatherCondition.includes("Mist")) {
                weatherIcon.src = "images/mist.png";
            } else {
                weatherIcon.src = "images/default.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            throw new Error("Weather data is incomplete");
        }
    } catch (error) {
        console.error(error);  // Log the error message
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
