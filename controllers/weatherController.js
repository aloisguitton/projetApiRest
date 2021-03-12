const {User} =  require("../models/db");

const response = require('../Services/Response');
const userModel = require("../models/userModel");

exports.getAllWeather = (req, res) => {

    response.success(res, {message: "data"})
}