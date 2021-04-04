const jwt = require('jsonwebtoken');
const response = require('../Services/Response')
const userModel = require("../models/userModel");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'uZY8+a4#dqs7B___enseirbbbbbbbbbb___j^QBk2F9093:z');
        req.user = decodedToken['token']
        if (decodedToken['token']) {
            userModel.retrieveId(decodedToken['token'])
                .then(() => {
                    next();
                })
                .catch(() => {
                    response.unauthorized(res, {error: "Unauthorized: token error1"})
                })
        } else {
            response.unauthorized(res, {error: "Unauthorized: token error2"})
        }
    } catch (e){
        response.unauthorized(res, {error: "Unauthorized: token error1"})
    }
};