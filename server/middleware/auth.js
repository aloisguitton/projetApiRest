const jwt = require('jsonwebtoken');
const response = require('../Services/Response')

module.exports = (req, res, next) => {
    try {
        let userToken, token
        if(req.body["userId"] === undefined){
            userToken = req.query["userId"]
            token = req.query["token"]
        } else {
            userToken = req.body["userId"]
            token = req.body["token"]
        }

        const decodedToken = jwt.verify(token, 'uZY8+a4#dqs7B___enseirbbbbbbbbbb___j^QBk2F9093:z');

        if (userToken && decodedToken['token'] === userToken) {
            next();
        } else {
            response.unauthorized(res, {error: "Unauthorized: token error"})
        }
    } catch (e){
        response.unauthorized(res, {error: "Unauthorized: token error"})
    }
};