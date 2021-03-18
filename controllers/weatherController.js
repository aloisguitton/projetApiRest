const {Weather} =  require("../models/db");

const response = require('../Services/Response');
const weatherModel = require("../models/weatherModel");

const APIKEY="e86938918e03ffa152e26008befa7ebd";
const WEATHERDATA = [];

const TOKEN = 0;

//api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=fr&appid=e86938918e03ffa152e26008befa7ebd

exports.getAllWeather = (req, res) => {
    weatherModel.getCities(1)
        .then(function(cities) {
            weatherModel.getUserModules(cities,APIKEY).then(x=>{
                console.log(x);
            })
        })
        .catch((e) => {
            console.log(e)
            response.error(e)
        })
}

exports.setCities = (req, res) => {
    req.body.cities.forEach(element => {
        weatherModel.setCity(req.body.user, element.name,"metric","fr");
    });
    response.success(res, {data: req.body.data});
}

exports.removeCity = (req, res) => {
    req.body.cities.forEach(element => {
        weatherModel.removeCity(req.body.user, element.name);
    });
    response.success(res, {data: req.body.data});
}

function getTime(timestamp){

    let date = new Date(timestamp*1000);

    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);

    return formattedTime;
}

function setDataFormat(data){

    const formattedData =
    {
        weather:{
            sky:{
                main: data.weather[0]['main'],
                description: data.weather[0]['description']
            },
            condition:{
                temperature: data.main.temp,
                humidity: data.main.humidity
            },
            wind:{
                speed: data.wind.speed,
                degree: data.wind.deg
            },
            sun:{
                sunrise: getTime(data.sys.sunrise),
                sunset: getTime(data.sys.sunset)
            }
        }
    }

    return formattedData;
}