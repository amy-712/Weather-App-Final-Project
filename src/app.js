function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class=row>`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
                Sat
                <br />
                <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
                <br />
                <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
      </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#place");
  let weatherComment = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let weatherIcon = document.querySelector("#today-emoji");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
  cityElement.innerHTML = response.data.name;
  weatherComment.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].icon);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  search(city.value);
}
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function fahrenheitConvert(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function celsiusConvert(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let myLocationData = () => {
  navigator.geolocation.getCurrentPosition(currentLocation);
};
let celsiusTemperature = null;
let locationButton = document.querySelector("#my-location-button");
locationButton.addEventListener("click", myLocationData);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#temperature-fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConvert);

let celsius = document.querySelector("#temperature-celsius");
celsius.addEventListener("click", celsiusConvert);

search("London");
displayForecast();
