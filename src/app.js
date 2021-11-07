function formatDate(timestamp) {
  let date = new Date();
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
let apiKey = "2236c7e355f68293390c37c68fbd7525";
let cityName = document.querySelector("#place");

function showTemperature(response) {
  cityName.innerHTML = response.data.name;

  let weatherComment = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let temperatureElement = document.querySelector("h1");
  let dateElement = document.querySelector("#date");
  let weatherIcon = document.querySelector("#today-emoji");
  weatherComment.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].icon);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function weatherLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  cityName.innerHTML = `${city.value}`;
  let units = "metric";
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let location = position.coords.name;
  let apiKey = "2236c7e355f68293390c37c68fbd7525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let myLocationData = () => {
  navigator.geolocation.getCurrentPosition(currentLocation);
};
let locationButton = document.querySelector("#my-location-button");
locationButton.addEventListener("click", myLocationData);

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", weatherLocation);
