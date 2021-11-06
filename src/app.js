let apiKey = "2236c7e355f68293390c37c68fbd7525";
let cityName = document.querySelector("h2");

function showTemperature(response) {
  cityName.innerHTML = response.data.name;
  let weatherToday = document.querySelector("h1");
  weatherToday.innerHTML = `${Math.round(response.data.main.temp)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let weatherComment = document.querySelector("#weather-description");
  weatherComment.innerHTML = `${response.data.weather[0].description}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
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
