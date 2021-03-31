const response = require('../Services/Response');
const userModel = require("../models/userModel");

exports.register = (req, res) => {
    let data = req.body
    userModel.register(data['firstname'], data['lastname'], data['password'], data['email'], data['city'], data['zip'], data['address'])
        .then(() => {
            response.success(res)
        })
        .catch(() => {
            response.error(res)
        })
}

exports.connect = (req, res, next) => {
    userModel.connect(req.body['email'], req.body['password'])
        .then((result) => {
            if (result === false) {
                response.unauthorized(res, "Connection error")
            } else {
                userModel.createToken(result)
                    .then(token => {
                        response.success(res, {
                            userId: result,
                            token: token
                        })
                    })
            }
        })
        .catch(() => {
            response.error(res)
        })
}

exports.parameters = async (req, res) => {
    let data = {}
    console.log(req.query)
    console.log(await userModel.retrieveId(req.query['userId']))
    let weather = await userModel.weatherParameters(await userModel.retrieveId(req.query['userId']))
    data.weather = weather
    response.success(res, data)
}
