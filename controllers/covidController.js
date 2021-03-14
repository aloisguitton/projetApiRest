var axios = require('axios');

const response = require('../Services/Response');
const covidModel = require('../models/covidModel');
const {Covid} =  require("../models/db");

exports.getAllCountryCovid = (req, res) => {

    var config = {
        method: 'get',
        url: 'https://api.covid19api.com/countries\n',
        headers: {
            'Content-Type': 'text/plain'
        }
    };

    axios(config)
        .then(function (responses) {
            console.log(JSON.stringify(responses.data));
            response.success(res, {message:responses.data})
        })
        .catch(function (error) {
            response.error(res, {error:error})
        });

}

exports.postCovid = (req, res) => {
    var id_user = req.body.iduser;
    var country = req.body.country;

    Covid.findAll({where: {id_user: id_user, country: country}})
        .then(covid => {
            console.log("covid => ", covid)
            if (covid.length === 0) {
                covidModel.register(country, id_user)
                    .then(() => {
                        response.success(res, {message: "Covid Module Add"})
                    })
                    .catch(error => {
                        console.log(error)
                        response.error(res)
                    });
            } else {
                response.error(res, {error: "Covid Module already exists"})
            }
        });
}


exports.getCovid = (req, res) => {

    var id_user = req.headers.iduser;

    Covid.findAll({where: {id_user: id_user}})
        .then( modules => {
            console.log(modules)
            modules.forEach(element => {
                console.log(element,"\n");
            })
                .then(response.success(res))
        })
        .catch(error => response.error(res, {error : "No modules"}))


}