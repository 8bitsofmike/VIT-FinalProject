window.onload = function() 
    {
        weatherBallon (5405380);
    }

    function weatherBallon(cityID)
    {   
        //this is the key from OWM site
        var key = "1173377dfba588826f50605cbe8d5860";
        
        //using Fetch to grab data from OWM API
        fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&appid=" + key)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            console.log(data);
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
        let currentTemp = calcFarenheit(d.main.temp);
        let highTemp = calcFarenheit(d.main.temp_max);
        let lowTemp = calcFarenheit(d.main.temp_min);

        new Date

        //var celcius = Math.round(parseFloat(d.main.temp)-273.15);
        //var farenheit = Math.round(((parseFloat(d.main.temp)-279.15)*1.8)+32);

    function calcFarenheit(temp)
    {
        farenheit=Math.round(((parseFloat(temp)-279.15)*1.8)+32);
        return farenheit
    }
        
    
    document.getElementById("cityheader").innerHTML = d.name;
    document.getElementById("currenttemp").innerHTML = "The current temperature is " + currentTemp + "&deg;";
    document.getElementById("todaysforcast").innerHTML = "Today\'s weather forcast for " + d.name  + ":<br />" + "The high temp will be " + highTemp + "&deg; F" + " and the low temp will be " + lowTemp + "&deg; F";
    // document.getElementById("currenttemp").innerHTML = "The current temperature is " + currentTemp + "&deg;" + "F";
    //document.getElementById("clouds").innerHTML = d.weather[];
    document.getElementById("sunrise").innerHTML = "<br />" + "The sun will rise at " + sunriseDate;
    document.getElementById("sunset").innerHTML = "The sun will set at " + sunsetDate;
    }


