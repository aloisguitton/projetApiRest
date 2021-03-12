var axios = require('axios');

const response = require('../Services/Response');

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



}


exports.getCovid = (req, res) => {

    var country;
}