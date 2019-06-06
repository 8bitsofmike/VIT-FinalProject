function weatherBallon(cityID)
{   
    //this is the key from OWM site
    var key = '1173377dfba588826f50605cbe8d5860';
    
    //using Fetch to grab data from OWM API
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data);
    })
    .catch(function() {
    });
}

window.onload = function() {
    weatherBallon (5405380);
}