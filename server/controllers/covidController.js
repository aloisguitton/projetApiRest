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

exports.postCovid = async (req, res) => {
    const id_user = await userModel.retrieveId(req.user);
    const country = req.body.country;

    covidModel.register(country, id_user)
        .then(() => {
            response.success(res)
        })
        .catch(error => {
            console.log(error)
            response.error(res)
        });
}

exports.delCovid = async (req, res) => {
    const id_user = await userModel.retrieveId(req.user);
    const country = req.body.country;

    covidModel.delete(country, id_user)
        .then(()=>{
            response.success(res);
        })
        .catch(()=>{
            response.error(res);
        })
}

exports.getCovid = async (req, res) => {
    const id_user = await userModel.retrieveId(req.user);
    console.log(id_user)
    covidModel.getUserModules(id_user)
        .then( modulesvalues => {
            response.success(res, {message: modulesvalues})
        })
        .catch((error) => {
            response.error(res);
        });
}