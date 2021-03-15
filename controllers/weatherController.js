const axios = require('axios');
const {Weather} =  require("../models/db");

const response = require('../Services/Response');
const userModel = require("../models/userModel");

const APIKEY="e86938918e03ffa152e26008befa7ebd";

//api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=fr&appid=e86938918e03ffa152e26008befa7ebd

exports.getAllWeather = (req, res) => {

    const config = {
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=fr&appid=e86938918e03ffa152e26008befa7ebd',
        headers: { }
    };

    axios(config)
        .then(function (result) {
            response.success(res,{data:result.data})
            console.log('\n'+JSON.stringify(result.data));
        })
        .catch(function (error) {
            response.error(res,{error: error});
            console.log(error);
        });
}

exports.getCities = (req, res) => {
    //TODO : Fonction permettant de récupérer les villes que l'utilisateur souhaite observer
}

exports.saveCities = (req, res) => {
    //TODO : Fonction permettant d'enregistrer les villes récupéré avec @getCities en bdd
}

exports.removeCities = (req, res) => {

}

exports.deleteCities = (req, res) => {

}