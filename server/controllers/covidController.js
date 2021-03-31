const response = require('../Services/Response');
const covidModel = require('../models/covidModel');
const userModel = require("../models/userModel");

exports.getAllCountryCovid = (req, res) => {
    covidModel.getAllCountryCovid()
        .then(function (responses) {
            response.success(res, {message:responses})
        })
        .catch(function (error) {
            response.error(res, {error:error})
        });
}

exports.postCovid = (req, res) => {

    const id_user = 1;//userModel.retrieveId(req.body.usertoken);
    const country = req.body.country;

    console.log(req.user)
    covidModel.register(country, id_user)
        .then(() => {
            response.success(res)
        })
        .catch(error => {
            response.error(res)
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

    covidModel.getUserModules(user_id)
        .then( modulesvalues => {
            response.success(res, {message: modulesvalues})
        })
        .catch((error) => {
            response.error(res);
        });
}