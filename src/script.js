function showError(typo) {
  let errorMessage = document.querySelector("#error-message");
  errorMessage.innerHTML = `<div class="error-msg">Uh-oh, that didn't work... did you really mean "${typo}"?</div>`;
  let mainElement = document.querySelector("main");
  mainElement.classList.add("error-opacity");
}

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = weekdays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekday}, ${hours}:${minutes}`;
}

function refreshWeather(response) {
  if (response.data.city != undefined) {
    let errorMessage = document.querySelector("#error-message");
    errorMessage.innerHTML = "";

    let mainElement = document.querySelector("main");
    mainElement.classList.remove("error-opacity");

    let currentTime = new Date(response.data.time * 1000);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatDate(currentTime);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let temperatureElement = document.querySelector("#temperature");
    let currentTemperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(currentTemperature);

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let feelsLikeElement = document.querySelector("#feels-like");
    let feelsLike = Math.round(response.data.temperature.feels_like);
    feelsLikeElement.innerHTML = `${feelsLike}°C`;

    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.temperature.humidity;
    humidityElement.innerHTML = `${humidity} %`;

    let windElement = document.querySelector("#wind");
    let wind = Math.round(response.data.wind.speed * 3.6);
    windElement.innerHTML = `${wind} km/h`;

    let iconElement = document.querySelector("#icon");
    let icon = response.data.condition.icon_url;
    iconElement.innerHTML = `<img src="${icon}" alt=""/>`;

    getForecast(response.data.city);
  } else {
    let searchInput = document.querySelector("#search-form-input");
    showError(searchInput.value);
  }
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

function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day.getDay()];
}

function getForecast(city) {
  let apiKey = "5o168182b8atd0a481fedf7024b43479";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let maxElement = document.querySelector("#max");
  let maxTemp = response.data.daily[0].temperature.maximum;
  maxElement.innerHTML = `${Math.round(maxTemp)}°C`;

  let minElement = document.querySelector("#min");
  let minTemp = response.data.daily[0].temperature.minimum;
  minElement.innerHTML = `${Math.round(minTemp)}°C`;

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 7) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-container">
            <div class="row">
              <div class="forecast">
                <div class="forecast-day">${formatDay(day.time)}</div>
                <img
                  class="forecast-icon"
                  src="${day.condition.icon_url}"
                  alt="${day.condition.description}"
                />
                <div class="forecast-temp">
                  <div class="forecast-temp-max">${Math.round(
                    day.temperature.maximum
                  )}°C</div>
                  <div class="forecast-temp-min">${Math.round(
                    day.temperature.minimum
                  )}°C</div>
                </div>
              </div>
            </div>
          </div>
          `;
    }
  });

  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#city-search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Perth");
