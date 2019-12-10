
// ------------- Number Facts ----------------//

// let fact = document.querySelector('#fact');
// let factText = document.querySelector('#factText');

// let numberInput = document.querySelector('#numberInput');
// numberInput.addEventListener('input', getFactFetch);

// function getFactAjax(){
//     let number = numberInput.value;

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://numbersapi.com/'+number);

//     xhr.onload = function(){
//         if(this.status == 200 && number != ''){
//             fact.style.display = 'block';
//             factText.innerText = this.responseText;
//         }
//     }

//     xhr.send();
// }

// function getFactFetch(){
//     let number = numberInput.value;

//     fetch('http://numbersapi.com/'+number)
//         .then(response => response.text())
//         .then(data => {
//             if(number != ''){
//                 fact.style.display = 'block';
//                 factText.innerText = data;
//             } else {
//                 fact.style.display = 'none';
//             }
            
//         })
//         .catch(err => console.log(err));
        
// }




//-------------Weather ---------------------------- //

let weatherData = document.querySelector('#weather-data');
let weatherCity = document.querySelector('#weather-city');
let weatherTemp = document.querySelector('#weather-temp');
let weatherDescription = document.querySelector('#weather-description');

function loadJSON(callback){

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Atlanta,us&appid=84f31defeb6290a61b56ea3d45ad79d9&units=metric', true);
    xobj.onload = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
           callback(xobj.responseText);

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
   
  });

 