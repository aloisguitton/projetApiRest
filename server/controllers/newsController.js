const response = require('../Services/Response');
const axios = require('axios')
const newsModel = require('../models/newsModel');

// https://newsapi.org/v2/top-headlines?country=fr&apiKey=8dbe1e1dec484dffa0d202c7d57b757a
const apiKey = "8dbe1e1dec484dffa0d202c7d57b757a"
const url = 'https://newsapi.org/v2/top-headlines?'
// 100 appels maximun par jour
//apiKey=8dbe1e1dec484dffa0d202c7d57b757a

exports.register = (req, res) => {
    let data = req.body
    newsModel.register(data['idUser'], data['country'],data['category'])
        .then(() => {
            response.success(res)
        })
        .catch(() => {
            response.error(res)
        })
}

exports.requestBddApi = (req, res) => {
    newsModel.findAllUser(req.query.user)
        .then(async (result) => {
            if (result != []) {
                let responsesData = []
                console.log("tableau non vide")
                for (let i = 0; i < result.length; i++) {
                    responsesData[i] = await requestAPI(result[i]);
                }
                response.success(res, responsesData)
            } else {
                response.success(res, result)
            }
        })
        .catch((error) => {
            console.log("error = "+error)
            response.error(res)
        })
}

async function requestAPI(result) {
    return new Promise((resolve, reject) => {
        if (result.country && result.category) {
            console.log("double")
            axios.get(url + 'category=' + result.category +'&country=' +result.country +'&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    console.log("error country + category = "+error)
                    reject();
                })
        } else if (result.country) {
            console.log("resultat country = "+result.country)
            axios.get(url + 'country=' + result.country + '&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    console.log("error country = "+error)
                    reject();
                })
        }else if (result.category) {
            console.log("resultat category = "+result.category)
            axios.get(url + 'category=' + result.category + '&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    console.log("error category = "+error)
                    reject();
                })
        }  else {
            console.log("else")
            reject();
        }
    });
}

function jsonTraitement(results) {
    let jsons = []
    results.forEach(result => {
        let json = {};
        json.title = result.title
        json.url = result.url
        json.publishedAt = result.publishedAt
        json.content = result.content
        jsons.push(json);
    })
    return jsons;
}

exports.requetsOneUser = (req, res) => {
    newsModel.findAllUser(req.query.user)
        .then((result) => {
            console.log(result)
            response.success(res, result)
        })
        .catch((error) => {
            console.log("error = " + error)
            response.error(res)
        })
}
