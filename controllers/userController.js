const response = require('../Services/Response');
const userModel = require("../models/userModel");

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