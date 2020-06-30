

//-------------Weather ---------------------------- //

let weatherData = document.querySelector('#weather-data');
let weatherCity = document.querySelector('#weather-city');
let weatherTemp = document.querySelector('#weather-temp');
let weatherDescription = document.querySelector('#weather-description');

function loadJSON(callback){

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Atlanta,us&appid=84f31defeb6290a61b56ea3d45ad79d9&units=metric', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
           callback(this.responseText);
           

        }
    }
    
    xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);
    weatherCity.innerText = jsonresponse.name;
    //convert celcius to farenheit
    var a = jsonresponse.main.temp;
    weatherTemp.innerText = Math.round(a*9/5+32)+String.fromCharCode(176)+ "F";
    weatherDescription.innerText = jsonresponse.weather[0].main;
    
    let w = jsonresponse.weather[0].main; 
    if (w === "Clouds"){
        document.getElementById('weather-icon').innerHTML = '<i class="small material-icons weatherIcon">wb_cloudy</i>';
    } else if (w === "Rain" || w === "Drizzle"){
        document.getElementById('weather-icon').innerHTML = '<span class="small material-icons weatherIcon"><img src="img/weather-rainy.svg"></span>';
    } else if (w === "Thunderstorm"){
        document.getElementById('weather-icon').innerHTML = '<i class="small material-icons weatherIcon">flash_on</i>';
    } else {
        document.getElementById('weather-icon').innerHTML = '<i class="small material-icons weatherIcon">wb_sunny</i>';
    }
  });


        

