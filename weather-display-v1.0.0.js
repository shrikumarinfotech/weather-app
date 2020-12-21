/**
 * Name: Weather App
 * Description: Display Weather of a City
 * Version: 1.0.0
 * Author: Shrikumar Infotech
 * Author URI: dev@shrikumarinfotech.com
 * License: MIT
 * Lincense URI: https://opensource.org/licenses/MIT
 */

'use strict';

$(document).ready(function(){
    // define weatherDisplay function
    function weatherDisplay(){
        console.log('this is from weather-display-v1.0.0.js');

        // define apikey
        const apiKey = 'fb077a47c8722866b24dfbf3054eb8b9';
        // define city name
        let city = '';
        if(city === ''){
            city = 'Kolkata';
        }

        // define html elements to display data
        const displayCityName = $('.display-city');
        const displayIconImage = $('.display-icon-image');
        const displayWeatherDescription = $('.display-weather-description');
        const displayTemp = $('.display-temp');
        const displayFeelsLike = $('.display-feels-like');
        const displayMinTemp = $('.display-min-temp');
        const displayMaxTemp = $('.display-max-temp');
        const displayHumidity = $('.display-humidity');
        const displayPressure = $('.display-pressure');
        const displayWindSpeed = $('.display-wind-speed');

        // define function for form submission
        $('#city-name').on('submit', function(e){
            e.preventDefault();
            // define regx for replace 'city=' from submission data
            const regX = /(?:city=)/gi;
            // get the city name
            city = $(this).serialize().replace(regX, '');
            // console.log($(this).serialize().replace(regX, ''));
            getWatherData(city);
        });
    
        function getWatherData(city){
            // get api URL (https://openweathermap.org/current)
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            
            // define required data values
            let temp = 0;
            let feelsLike = 0;
            let tempMin = 0;
            let tempMax = 0;
            let humidity = 0;
            let pressure = 0;
            let windSpeed = 0;
    
            // get JSON data using jQuery
            // https://api.jquery.com/jQuery.getJSON/#jQuery-getJSON-url-data-success
            $.getJSON(apiUrl, function (data) {
                    // console.log(data);
                    // conversion
                    let tempF = convertCToF(data.main.temp);
                    // console.log(tempF);

                    // display city name
                    displayCityName.text(`${data.name}`);

                    // display icon
                    displayIconImage.html(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`);
                    displayWeatherDescription.text(`${data.weather[0].main}`);

                    // display temperature data
                    displayTemp.text(`Today: ${data.main.temp}°C/${tempF}°F`);
                    displayFeelsLike.text(`Feels: ${data.main.feels_like}°C`);
                    displayMinTemp.text(`Min: ${data.main.temp_min}°C`);
                    displayMaxTemp.text(`Max: ${data.main.temp_max}°C`);

                    // display other data
                    displayHumidity.text(`Humidity: ${data.main.humidity}%`);
                    displayPressure.text(`Pressure: ${data.main.pressure}pz`);
                    displayWindSpeed.text(`Wind: ${data.wind.speed}km/h`);
    
                }
            );
        
        }
        getWatherData(city);

        // define function to convert Celcius to Farenhite
        function convertCToF(x){
            // do the conversion
            x = Math.round(9*x/5 + 32);
            return x;
        }
    
    }
    
    weatherDisplay();

});


