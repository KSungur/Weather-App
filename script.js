var APPID = "4406c880477cda013805209938dcf0a1";
var temp;
var loc;
var countryCode;
var condition;
var condition_id;
var background;

function updateByCity() {
  var city = document.getElementById("city").value;
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city +
        "&APPID=" + APPID;
    sendRequest(url);
}

function updateByGeo(lat,lon) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&APPID=" + APPID;
    sendRequest(url);
}
      function getLocation() {
            if (navigator.geolocation)  {
            navigator.geolocation.getCurrentPosition(showPosition,showError);
            }
            else{
              alert("Geolocation is not supported by this browser.");
            }
      }
      function showPosition(position){
      updateByGeo( position.coords.latitude , position.coords.longitude);
      }
      function showError(error) {
          switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                  break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                  break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                  break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                  break;
          }
      }
      getLocation();

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            console.log(data);
            weather.code = data.weather[0].id;
            weather.loc = data.name;
            weather.countryCode = data.sys.country;
            weather.condition = data.weather[0].main;
            condition_id = data.weather[0].id;
            console.log(condition_id);

            var kelvin = data.main.temp;
            var getCelsius = K2C(kelvin);
            var getFahrenheit = K2F(kelvin);
            var celcius = true;

            $("#temperature").html(getCelsius + 'C' + '&deg;');
            $("#temperature").click(function() {
                if (celcius) {
                    $(".toggle").html(getFahrenheit + 'F' + '&deg;');
                } else {
                    $("#temperature").html(getCelsius + 'C' + '&deg;');
                }
                celcius = !celcius;
            });
            update(weather);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {
    loc.innerHTML = weather.loc + ",";
    countryCode.innerHTML = weather.countryCode;
    condition.innerHTML = weather.condition.toUpperCase();

        if (condition_id == 800) {
        $(background).removeClass();
        $(background).addClass('clear_img');
      } else if (condition_id >= 700 && condition_id <= 799 ) {
        $(background).removeClass();
        $(background).addClass('mist_img');
      } else if ((condition_id >= 500 && condition_id <= 599) || (condition_id >= 300 && condition_id <=  399)) {
        $(background).removeClass();
        $(background).addClass('rain_img');
      } else if (condition_id >= 600 && condition_id <= 699) {
        $(background).removeClass();
        $(background).addClass('snow_img');
      } else if (condition_id >= 801 && condition_id <= 899) {
        $(background).removeClass();
        $(background).addClass('cloud_img');
      } else if (condition_id >= 200 && condition_id <= 299) {
        $(background).removeClass();
        $(background).addClass('thunder_img');
      } else {
        $(background).removeClass();
        $(background).addClass('start');
      }
}

window.onload = function() {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    countryCode = document.getElementById("country");
    condition = document.getElementById("condition");
    background = document.getElementById("backgroundImg");
};

function K2F(k) {
    return Math.round(k * (9 / 5) - 459.67);
}

function K2C(k) {
    return Math.round(k - 273.15);
}
