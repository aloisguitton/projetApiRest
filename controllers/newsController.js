const response = require('../Services/Response');
const axios = require('axios')

exports.test = (req, res) => {
    response.success(res, "salut")
}

// 100 appels maximun par jour
//apiKey=8dbe1e1dec484dffa0d202c7d57b757a

exports.register = (req, res) => {
    let data = req.body
    console.log(data)
    userModel.register(data['firstname'], data['lastname'], data['password'], data['email'], data['city'], data['zip'], data['address'])
        .then(() => {
            response.success(res)
        })
        .catch(() => {
            response.error(res)
        })
}


exports.country = (req, res) => {
    let country = req.params.country;
    axios.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey=8dbe1e1dec484dffa0d202c7d57b757a')
        .then(function (result) {
            response.success(res, result.data);
        })
        .catch(function (error) {
            response.error(res, {message: "error /news/country"});
        })
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
