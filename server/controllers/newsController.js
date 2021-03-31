const response = require('../Services/Response');
const axios = require('axios')
const newsModel = require('../models/newsModel');
const userModel = require('../models/userModel');

// https://newsapi.org/v2/top-headlines?country=fr&apiKey=8dbe1e1dec484dffa0d202c7d57b757a
const apiKey = "8dbe1e1dec484dffa0d202c7d57b757a"
const url = 'https://newsapi.org/v2/top-headlines?'
// 100 appels maximun par jour
//apiKey=8dbe1e1dec484dffa0d202c7d57b757a

exports.register = async (req, res) => {
    let data = req.body.news
    let user = await userModel.retrieveId(req.user)
    newsModel.delete(user)
        .then(() => {
            if (data.length > 0) {
                (new Promise(async (resolve, reject) => {
                    for (let i = 0; i < data.length; i++) {
                        await newsModel.register(user, data[i]['country'], data[i]['category'])
                    }
                    resolve()
                })).then(() => {
                        response.success(res)
                    })
                    .catch(() => {
                        response.error(res)
                    })
            } else {
                response.success(res)
            }
        })
        .catch(() => {
            response.error(res)
        })
}

exports.requestBddApi = async (req, res) => {
    newsModel.findAllUser(await userModel.retrieveId(req.user))
        .then(async (result) => {
            if (result.length > 0) {
                let responsesData = []
                for (let i = 0; i < result.length; i++) {
                    responsesData[i] = await requestAPI(result[i]);
                }
                response.success(res, responsesData)
            } else {
                response.success(res, result)
            }
        })
        .catch((error) => {
            response.error(res)
        })
}

async function requestAPI(result) {
    return new Promise((resolve, reject) => {
        if (result.country && result.category) {
            axios.get(url + 'category=' + result.category + '&country=' + result.country + '&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    reject();
                })
        } else if (result.country) {
            axios.get(url + 'country=' + result.country + '&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    reject();
                })
        } else if (result.category) {
            axios.get(url + 'category=' + result.category + '&apiKey=' + apiKey)
                .then(function (results) {
                    let jsons = jsonTraitement(results.data.articles);
                    resolve(jsons);
                })
                .catch(function (error) {
                    reject();
                })
        } else {
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

exports.requetsOneUser = async (req, res) => {
    newsModel.findAllUser(await userModel.retrieveId(req.user))
        .then((result) => {
            response.success(res, result)
        })
        .catch((error) => {
            response.error(res)
        })
}
