const db =  require("../models/db");
const axios = require('axios');

exports.register = (country, id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.findOrCreate({
            where: {
                country: country,
                id_user: id_user
            }
        })
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject()
            })
    });
}

exports.delete = (country, id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.destroy({where: {id_user: id_user, country: country}})
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    });
}

exports.getCovid19Values = (country) => {
    const date = new Date();
    const fulldate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());


    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://api.covid19api.com/live/country/'+country+'/status/confirmed/date/'+(new Date()).setDate((new Date()).getDate() - 1)
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

exports.getUserModules = (id_user) => {

    let modulesvalues = [];

    return new Promise((resolve, reject) => {
        db.Covid.findAll({where: {id_user: id_user}})
            .then(async (responses) => {
                for(let i = 0; i < responses.length; i++){
                    let country = responses[i]["country"];

                    let values = await this.getCovid19Values(country);
                    modulesvalues.push(values);
                }
                resolve(modulesvalues);
            })
            .catch((error)=>{
                reject(error);
            })
    });
}

exports.getAllCountryCovid = () => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://api.covid19api.com/countries',
            headers: {
                'Content-Type': 'text/plain'
            }
        };

        axios(config)
            .then(function (responses) {
                resolve(responses.data);
            })
            .catch(function (error) {
                reject();
            });
    });
}


