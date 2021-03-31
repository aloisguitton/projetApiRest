const jwt = require('jsonwebtoken');
const response = require('../Services/Response')

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'uZY8+a4#dqs7B___enseirbbbbbbbbbb___j^QBk2F9093:z');
        req.user = decodedToken['token']
        if (decodedToken['token']) {
            next();
        } else {
            response.unauthorized(res, {error: "Unauthorized: token error2"})
        }
    } catch (e){
        response.unauthorized(res, {error: "Unauthorized: token error1"})
    }
};