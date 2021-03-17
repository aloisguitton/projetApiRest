var axios = require('axios');

const response = require('../Services/Response');
const covidModel = require('../models/covidModel');
const db = require("../models/db");
const userModel = require("../models/userModel");

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
            response.success(res, {message:responses.data})
        })
        .catch(function (error) {
            response.error(res, {error:error})
        });

}

exports.postCovid = (req, res) => {

    const id_user = 1;//userModel.retrieveId(req.body.usertoken);
    const country = req.body.country;

    covidModel.checkExists(country, id_user)
        .then(test => {
            if (test) {
                covidModel.register(country, id_user)
                    .then(() => {
                        response.success(res, {message: "Covid Module Add"})
                    })
                    .catch(error => {
                        response.error(res)
                    });
            } else {
                response.error(res, {error: "Covid Module already exists"})
            }
        })
        .catch(error => {
            response.error(res, {error: error})
        });
}

exports.delCovid = (req, res) => {
    const id_user = 1; //userModel.retrieveId(req.query["token"]);
    const country = req.params.country;

    covidModel.delete(country, id_user)
        .then(()=>{
            response.success(res);
        })
        .catch(()=>{
            response.error(res);
        })
}

exports.getCovid = (req, res) => {

    const user_id = 1;  //userModel.retrieveId(req.query["token"]);

    let modulesvalues = [];
    const date = new Date();
    const fulldate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);

    covidModel.getUserModules(user_id)
        .then( async (modules) => {

            for(let i = 0; i < modules.length; i++){
                let country = modules[i]["country"];

                let responses = await getCovid19Values(country, fulldate);
                modulesvalues.push(responses);
            }
            response.success(res, {message: modulesvalues})
        })
        .catch((error) => {
            response.error(res);
        });

}

async function getCovid19Values(country, date){
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://api.covid19api.com/live/country/'+country+'/status/confirmed/date/'+date+'T00:00:00Z'
        };

        axios(config)
            .then(function (responses) {
                resolve(responses.data[0]);
            })
            .catch(function (error) {
                reject();
            });
    });
}