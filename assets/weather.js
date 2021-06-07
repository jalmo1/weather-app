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
var temp = document.querySelector("#tempEl");
var wind = document.querySelector("#windEl");
var humid = document.querySelector("#humidEl");
var UvI = document.querySelector("#uvIndexEl");
var currentCityDisplay = document.querySelector("#city");
var dateDisplay = document.querySelector("#date");
var cityHistory = {};
var searchBtn = document.querySelector("#searchBtn");
var citySearchInputEl = document.getElementById("city-search-input");
var fiveDay = document.getElementById("5dayforecast");
var currentWeather = document.querySelector(".current-weather");
var currentDate = moment().format("MMMM Do YYYY");
console.log(currentDate);

$("#searchBtn").click(function (event) {
  event.preventDefault();
  if (citySearchInputEl.value === "") {
    alert("You must enter a city");
    return;
  } else {
    localStorage.setItem("city-search-input", citySearchInputEl.value);
    getCity();

    //getUvIndex();
  }
  console.log(citySearchInputEl.value);
});

function getCity(searchedCity) {
  var apiKey = "4d3c063e98523c8c6f0e9acf35c7a45f";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearchInputEl.value +
      "&units=imperial&appid=" +
      apiKey
  ).then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log(response, data);
        //pulls the data from the API
        /*var cityArr = {};
        console.log(cityArr);
        cityArr.city = data.name;
        cityHistory.push(cityArr);
        saveCity("cities", JSON.stringify(cityHistory));*/

        //let uvApi = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityArr.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`;
        $("#tempEl").text("Temperature: " + Math.floor(data.main.temp));
        $("#windEl").text("Wind: " + Math.floor(data.wind.speed));
        $("#humidEl").text("Humidity: " + Math.floor(data.main.humidity));
        return data;
      }) //clears content and displays new city/date
      .then(function displayCityDate(data) {
        currentCityDisplay.textContent = "";
        dateDisplay.textContent = "";
        $("#city").append(citySearchInputEl.value);
        $("#date").append(currentDate);
        return fetch(
          "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
            data.coord.lat +
            "&lon=" +
            data.coord.lon +
            "&appid=4d3c063e98523c8c6f0e9acf35c7a45f"
        ).then(function (response) {
          return response.json();
        });
      })
      .then(function getUvIndex(data) {
        console.log(data);
        $("#uvIndexEl").text("UV Index: " + data.current.uvi);

        if (data.current.uvi <= 2) {
          $("#uvIndexEl").addClass("moderate");
        }
        return data;
      })
      .then(function getIcon(data) {
        var weatherIcon =
          "http://openweathermap.org/img/wn/" +
          data.current.weather[0].icon +
          ".png";
        console.log(data.current.weather[0].icon);
        $("#weatherIcon").attr("src", weatherIcon);
        return data;
      })
      .then(function fiveDay(data) {
        for (var i = 1; i < 6; i++) {
          var temp = data.daily[i].temp.day;
          var humidity = data.daily[i].humidity;
          var wind = data.daily[i].wind_speed;
          var uvIndex = data.daily[i].uvi;
          var weatherIcon =
            "http://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            ".png";
          //createFiveDay();
        }
      });
  });
}

function saveCity(key, value) {
  localStorage.setItem(key, value);
}
