function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);
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
