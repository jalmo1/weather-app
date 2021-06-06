/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/
var city = "";
var previousCity = "";
var searchBtn = document.querySelector("#searchBtn");
var citySearchInputEl = document.getElementById("city-search-input");
var fiveDay = document.getElementById("5dayforecast");
var currentWeather = document.querySelector(".current-weather");

$("#searchBtn").click(function (event) {
  event.preventDefault();
  if (citySearchInputEl.value === "") {
    alert("You must enter a city");
    return;
  } else {
    localStorage.setItem("city-search-input", citySearchInputEl.value);
    getCity();
  }
  console.log(citySearchInputEl.value);
  console.log("City searched");
});

function getCity(searchedCity) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=searchedCity&units=imperial&appid=";
  var apiKey = "4d3c063e98523c8c6f0e9acf35c7a45f";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearchInputEl.value +
      "&units=imperial&appid=" +
      apiKey
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(response, data);
    });
  });
}
