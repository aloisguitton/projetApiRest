const response = require('../Services/Response');
const axios = require('axios')
const newsModel = require('../models/newsModel');
const {News} =  require("../models/db");

exports.test = (req, res) => {
    response.success(res, "salut")
}

// 100 appels maximun par jour
//apiKey=8dbe1e1dec484dffa0d202c7d57b757a

exports.registerCountry = (req, res) => {
    console.log("salut")
    let data = req.body
    console.log("iduser = "+data['idUser']+", country = "+data['country'])
    //console.log(data)
    newsModel.registercountry(data['idUser'], data['country'])
        .then(() => {
            response.success(res)
        })
        .catch(() => {
            response.error(res)
        })
}


exports.testrequetebdd = (req, res) => {
    console.log("controlleur testrequetebdd")
    exports.connect = (req, res, next) => {
        newsModel.findAllUser(1)
            .then((result) => {
                console.log(result);
            })
            .catch(() => {
                response.error(res)
            })
    }


  /*  let country = req.params.country;
    axios.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey=8dbe1e1dec484dffa0d202c7d57b757a')
        .then(function (result) {
            response.success(res, result.data);
        })
        .catch(function (error) {
            response.error(res, {message: "error /news/country"});
        })

   */
}

exports.category = (req, res) => {
    let category = req.params.category;
    axios.get('https://newsapi.org/v2/top-headlines?category='+category+'&apiKey=8dbe1e1dec484dffa0d202c7d57b757a')
        .then(function (result) {;
            response.success(res, result.data);
        })
        .catch(function (error) {
            response.error(res, {message: "error /news/category"});
        })
}
