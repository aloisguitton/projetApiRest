const axios = require('axios');
const {Weather} =  require("../models/db");

const response = require('../Services/Response');
const userModel = require("../models/userModel");
const weatherModel = require("../models/weatherModel");

const APIKEY="e86938918e03ffa152e26008befa7ebd";

const TOKEN = 0;

//api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=fr&appid=e86938918e03ffa152e26008befa7ebd

exports.getAllWeather = (req, res) => {

    const config = {
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q='+req.query.city+'&units=metric&lang=fr&appid='+APIKEY,
        headers: { }
    };

    axios(config)
        .then(function (result) {
            console.log(setDataFormat(result.data));
            response.success(res,{data:result.data});

            //envoie du json en base de donnée
        })
        .catch(function (error) {
            response.error(res,{error: error});
        });
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

exports.deleteCities = (req, res) => {

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