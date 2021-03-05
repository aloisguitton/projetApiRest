const {User} =  require("../models/db");

const response = require('../Services/Response');
const userModel = require("../models/userModel");

exports.getAllUsers = (req, res) => {
    userModel.getAllUsers()
    User.findAll().then(
        user => {
            console.log(user)
        }
    );
    response.success(res, {message: "data"})
}