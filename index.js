
//access OpenWeather API and draw to site
// window.onload = function() 
// {
//     weatherBallon (nameCity);
// }
window.onload = function() 
{
    getSchool();
}

function getSchool()
{   
    //this is the key from OWM site
    var key = "6cIJQHwVG2gQoWzAAn2DMbNsTde4DlCR8VENo6Zl";
    
    //using Fetch to grab data from OWM API
    fetch("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=2,3&_fields=id,school.name,latest.student.size&api_key=" + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data);

    })
    .catch(function() {
    }) ;
}

let nameCity

//grab form
const cityForm = document.querySelector('#cityform');
//console.log(cityForm + " This is the cityform");

cityForm.addEventListener('submit', event =>
{
    event.preventDefault();
    const input = document.querySelector('.cityname');

    const text = input.value.trim();
//    console.log(text[Object.keys(text)[0]]);

        if(text !== '')
        {
            nameCity = text;
            console.log(text);
            weatherBallon(nameCity);
            
            input.value = '';
            input.focus();
        }
        else
        {
            alert("Please enter a valid city name");
        }
});


function weatherBallon(cityID)
{   
    //this is the key from OWM site
    var key = "1173377dfba588826f50605cbe8d5860";
    
    //using Fetch to grab data from OWM API
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + nameCity + "&units=imperial" + "&appid=" + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data.cod);
        if(data.cod == 200)
        {
            drawWeather(data);
        }
        else
        {
            alert("Please enter a valid city name");
        }
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
    let currentTemp = d.main.temp;
    let highTemp = d.main.temp_max;
    let lowTemp = d.main.temp_min;

    new Date

    document.getElementById("cityheader").innerHTML = d.name;
    document.getElementById("currenttemp").innerHTML = "The current temperature is " + currentTemp + "&deg;";
    document.getElementById("todaysforcast").innerHTML = "Today\'s weather forcast for " + d.name  + ":<br />" + "The high temp will be " + highTemp + "&deg; F" + " and the low temp will be " + lowTemp + "&deg; F";
    document.getElementById("sunrise").innerHTML = "<br />" + "The sun will rise at " + sunriseDate;
    document.getElementById("sunset").innerHTML = "The sun will set at " + sunsetDate;
}

/******todo list section******/
let todoItems = [];

function addTodo(text)
{
    //making a const reference to value in this obj
    const todo = 
    {
        text,
        checked: false,
        id: Date.now(),
    };

    //pushing 
    todoItems.push(todo);
    //console.log(todoItems);

    const list = document.querySelector('.js-todo-list');

    //inserting new li elements for each todo item
    //beforeend places li element before closing tag
    //data-key to locate item id easier
    list.insertAdjacentHTML('beforeend', 
    `<li class="todo-item" data-key="${todo.id}">
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="ui button delete-todo js-delete-todo" id="removebutton">Delete</button>
    </li>
    `);
}

//grab form
const form = document.querySelector('.js-form');

//block default action
//in this case stop browser from page refresh on form submission
form.addEventListener('submit', event => 
{
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    //remove whitespace if any entered
    const text = input.value.trim();

    if (text !=='')
    {
        //pass text to addTodo function
        addTodo(text);
        input.value = '';
        //focus on the text that's input
        input.focus();
    }
});

// add listener to mark task "done"
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event =>
{
    //listening for clicks in .js-todo-list
    if (event.target.classList.contains('js-tick'))
    {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if(event.target.classList.contains('js-delete-todo'))
    {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

function deleteTodo(key)
{
    todoItems = todoItems.filter(item => item.id !== Number(key));
    item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}

//get key that was checked/unchecked 
function toggleDone(key)
{
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked)
    {
        item.classList.add('done');
    } 
    else
    {
        item.classList.remove('done');
    }
}
