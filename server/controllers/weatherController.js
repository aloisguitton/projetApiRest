const {Weather} =  require("../models/db");
const userModel = require("../models/userModel");
const response = require('../Services/Response');
const weatherModel = require("../models/weatherModel");

const APIKEY="e86938918e03ffa152e26008befa7ebd";

exports.getAllWeather = async (req, res) => {
    weatherModel.getCities(await userModel.retrieveId(req.user))
        .then(function(cities) {
            weatherModel.getUserModules(cities,APIKEY).then(result =>{
                response.success(res, result);
            })
        })
        .catch((e) => {
            response.error(res, e)
        })
}

exports.setCities = (req, res) => {
    req.body.cities.forEach(async (element) => {
        weatherModel.setCity(await userModel.retrieveId(req.user), element.name, "metric", "fr");
    });
    response.success(res, {data: req.body.data});
}

exports.removeCity = (req, res) => {
    req.body.cities.forEach(async (element) => {
        weatherModel.removeCity(await userModel.retrieveId(req.user), element.name);
    });
    response.success(res, {data: req.body.data});
}