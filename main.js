var getlocation = "";
function checkweather()
{
    var location = document.querySelector("#location").value;
    if(location==""){
        alert("Please enter a valid location");
    }
    else{
        getlocation = location;
        let searchURL = "http://localhost:3000/" + location;
        fetch(searchURL)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            displayLocationResult(result);
        })
        .catch(function(error){
            console.log(error.message);
        });
    }
}    
function displayLocationResult(result)
{
    let msgDiv = document.querySelector("#message");
    let div = document.querySelector("#result");
    console.log(result);
    if(result.message)
    {
        div.innerHTML = "";
        msgDiv.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">\
                                <strong>oops!</strong> ${result.messsage}\
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                                </button>\
                            </div>`;
    }
    else
    {
        msgDiv.innerHTML =  `<div class="well" >\
                                <h2 style="text-align:center">Weather of ${getlocation}</h2>\
                            </div>`;
        div.innerHTML = "";
        const weather = result.consolidated_weather;
        console.log(weather);
        for(let i = 0;i<weather.length;i++)
        {
            console.log(weather[i].weather_state_abbr);
            var elements =  `<div>${weather[i]}`;
            var getdata =   `<div class="col-md-12">
                                <div class="jumbotron">
                                    <h3>Date:<h5> ${weather[i].applicable_date}</h5></h3>
                                    <p><h3>Minimum Temperature<h5> ${weather[i].min_temp} &deg;C</h3></h5>
                                    <h3>Current Temperature<h5> ${weather[i].the_temp} &deg;C</h3></h5>
                                    <h3>Maximum Temperature<h5> ${weather[i].max_temp} &deg;C</h3></h5>
                                    <h3>Wind Speed<h5> ${weather[i].wind_speed} </h3></h5>
                                    <h3>Current State Weather<h5> ${weather[i].weather_state_name}</h3></h5>
                                    <h3>Humidity<h5> ${weather[i].humidity}</h3></h5></p>  
                                </div> 
                            </div>                     
                            </div>`
            $("#result").append(getdata);
        }       
    }
}