function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike} °C`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;

  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed * 3.6);
  windElement.innerHTML = `Wind speed: ${wind} km/h`;
}

function searchCity(city) {
  let apiKey = "5o168182b8atd0a481fedf7024b43479";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Perth");
