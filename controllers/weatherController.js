const {Weather} =  require("../models/db");

const response = require('../Services/Response');
const weatherModel = require("../models/weatherModel");

const APIKEY="e86938918e03ffa152e26008befa7ebd";

exports.getAllWeather = (req, res) => {
    weatherModel.getCities(req.query.user)
        .then(function(cities) {
            weatherModel.getUserModules(cities,APIKEY).then(result =>{
                console.log(result);
                response.success(res, result);
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