function apiCallZip(zipcode){
  var response;
  // var url = 'https://samples.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid=d855ef6b7b39ca226ad1946b488de93d';
  var url = 'https://api.apixu.com/v1/forecast.json?key=37b4a164cd6c474b8c2170127170109&q=' + zipcode + '&days=7';
  // https://api.apixu.com/v1/forecast.json?key=37b4a164cd6c474b8c2170127170109&q=94536&days=7
  console.log(url);

  $.ajax({
      url: url
  }).then(function(data) {
    response = JSON.stringify(data);
    response = JSON.parse(response);
    // console.log(response);
    $('#name').html("City: " + response.location.name + ", " + response.location.region + ", " + response.location.country);
    $('#current').html("Current Weather: ");
    $('#weather-temp').html("Temperature: " + response.current.temp_c + "℃");
    $('#weather-text').html("Weather: " + response.current.condition.text);
    var icon = "https:" + response.current.condition.icon;
    $('#weather-icon').html("<img src='" + icon + "'>");
    $('#wind-speed').html("Wind speed: " + response.current.wind_mph + " miles/hour");
    $('#wind-degree').html("Wind degree: " + response.current.wind_degree);

    $('#forecast').html("Weather Forecast: ");
    $('#day1').html("Day 1: ");
    $('#weather-forecast-1-date').html("Weather: " + response.forecast.forecastday[0].date);
    $('#weather-forecast-1-temp').html("Temperature: " + response.forecast.forecastday[0].day.avgtemp_c + "℃");
    $('#weather-forecast-1-text').html("Weather: " + response.forecast.forecastday[0].hour[0].condition.text);
    var icon = "https:" + response.forecast.forecastday[0].hour[0].condition.icon;
    $('#weather-forecast-1-icon').html("<img src='" + icon + "'>");
    $('#wind-forecast-1-speed').html("Wind speed: " + response.forecast.forecastday[0].hour[0].wind_mph + " miles/hour");
    $('#wind-forecast-1-degree').html("Wind degree: " + response.forecast.forecastday[0].hour[0].wind_degree);
  });

};

function apiCallName(name){
  var response;

  var url = 'https://api.apixu.com/v1/current.json?key=37b4a164cd6c474b8c2170127170109&q=' + name;

  console.log(url);

  $.ajax({
      url: url
  }).then(function(data) {
    response = JSON.stringify(data);
    response = JSON.parse(response);
    // console.log(response);
    $('#name').html("City: " + response.location.name + ", " + response.location.region + ", " + response.location.country);
    $('#current').html("Current Weather: ");
    $('#weather-temp').html("Temperature: " + response.current.temp_c + "℃");
    $('#weather-text').html("Weather: " + response.current.condition.text);
    var icon = "https:" + response.current.condition.icon;
    $('#weather-icon').html("<img src='" + icon + "'>");
    $('#wind-speed').html("Wind speed: " + response.current.wind_mph + " miles/hour");
    $('#wind-degree').html("Wind degree: " + response.current.wind_degree);
  });

};

/*
function apiZip(lat, long) {
  var response;

  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ','+ long + '&key=AIzaSyCRIOl9kHuudK_5JBFPOMZyDGcnlnhswpw';
  // var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCRIOl9kHuudK_5JBFPOMZyDGcnlnhswpw';

  $.ajax({
      url: url
  }).then(function(data) {
    response = JSON.stringify(data);
    response = JSON.parse(response);

    var zipcode = response.results[0].address_components[7].long_name;
    apiCallZip(zipcode);
  });
}
*/

function clear() {
  $('#zip').html("");
  $('#name').html("");
  $('#current').html("");
  $('#weather-temp').html("");
  $('#weather-text').html("");
  $('#weather-icon').html("");
  $('#wind-speed').html("");
  $('#wind-degree').html("");
  $('#forecast').html("");
  $('#day1').html("");
  $('#weather-forecast-1-date').html("");
  $('#weather-forecast-1-temp').html("");
  $('#weather-forecast-1-text').html("");
  $('#weather-forecast-1-icon').html("");
  $('#wind-forecast-1-speed').html("");
  $('#wind-forecast-1-degree').html("");

}

$(function() {
  // console.log("document ready");
  // submit();

  $("#search-zip").click(function() {
    var zipcode = $('#zipcode').val();
    if (zipcode.length == 5 || zipcode.length == 6) {
      $('#zip').html("Zip Code: " + zipcode);
      apiCallZip(zipcode);
    } else {
      alert("Wrong zip code!");
    }
  });

  $("#zipcode").keypress(function (e) {
    if(e.which == 13) {
      $("#search-zip").click();
      return false;
    }
  });

  $("#searchC").click(function() {
    var name = $('#city-name').val();
    console.log(name);
    clear();
    apiCallName(name);
  });


  $("#city-name").keypress(function (e) {
    if(e.which == 13) {
      $("#searchC").click();
      return false;
    }
  });

  $("#locate-me").click(function() {
    // clear();
    /*
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
      }
    }

    apiZip(lat, long);
    */

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var point = new google.maps.LatLng(lat, long);
        new google.maps.Geocoder().geocode(
            {'latLng': point},
            function(res, status) {
              var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
              //$("#locate-me").val(zip[1]);
              var zipcode = zip[1];
              $('#zip').html("Zip Code: " + zipcode);
              apiCallZip(zipcode);
            }
        );
      });
    }


  });

});
