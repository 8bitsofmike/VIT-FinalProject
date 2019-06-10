document.body.onload = addElement();

var myForm = document.querySelector("#my-form")
var appendHere = document.querySelector("#weather-append")
var newDiv
var newContent
var innerContent
var weather

function addElement()
{
    //create new div element
    var newDiv = document.createElement("div");
    //insert content in div
    var newContent = document.createTextNode("Hi there and greetings!");
    //add text node todiv
    newDiv.appendChild(newContent);
    //add newly created element&content into DOM
    var currentDiv = document.getElementById("weather-append");
    document.body.insertBefore(newDiv, currentDiv);
}

function weatherBallon(cityID)
{   
    //this is the key from OWM site
    var key = "1173377dfba588826f50605cbe8d5860";
    
    //using Fetch to grab data from OWM API
    fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&appid=" + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        // console.log(data);
        drawWeather(data);
    })
    .catch(function() {
    }) ;
}

function drawWeather (d)
{
        let unixSunrise = d.sys.sunrise;
        let unixSunset = d.sys.sunset;

        let sunriseDate = new Date(unixSunrise * 1000);
        let sunsetDate = new Date(unixSunset * 1000);

        new Date

        var celcius = Math.round(parseFloat(d.main.temp)-273.15);
        var farenheit = Math.round(((parseFloat(d.main.temp)-279.15)*1.8)+32);
        
        weather = data[i];

        console.log(weather);
        // <div class="description">
        //     <div class="weatherheader">
        //     ${d.weather[0]}
        //     </div>
        // </div>`


        // document.getElementById("description").innerHTML = d.weather[0].description;
        // document.getElementById("currenttemp").innerHTML = "The current temperature is " + farenheit + "&deg;";
        // document.getElementById("today").innerHTML = "Today\"s weather forcast for " + d.name + " is:";
        // document.getElementById("sunrise").innerHTML = "The sun will rise at " + sunriseDate;
        // document.getElementById("sunset").innerHTML = "The sun will set at " + sunsetDate;
}