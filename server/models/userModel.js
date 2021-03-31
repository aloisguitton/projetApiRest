const sequelize = require("sequelize");
const {User, Weather, Covid} =  require("../models/db");
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const CryptoJS = require('crypto-js');

exports.createToken = async (token) => {
    const res = {
        token: jwt.sign(
            {token: token},
            'uZY8+a4#dqs7B___enseirbbbbbbbbbb___j^QBk2F9093:z',
            {expiresIn: '31d'}
        )
    }
    return res['token']
}

exports.register = (firstName, lastName, pass, email, city, zip, addr) => {
    return new Promise((resolve, reject) => {
        User.create({
            fist_name: firstName,
            last_name: lastName,
            password: pass,
            email: email,
            address: addr,
            postal_code: zip,
            city: city,
            token: CryptoJS.MD5(cryptoRandomString({length: 25, type: 'alphanumeric'})).toString()
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

exports.connect = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('token')), 'cnt'],
                'token'
            ],
            where: {email: email, password: password}})
            .then((res) => {
                let result;
                let data = res[0]['dataValues'];
                if(data['cnt'] === 0){
                    result = false
                } else {
                    result = data['token']
                }
                resolve(result)
            })
            .catch((err) => {
                reject()
            })
    })
}

exports.retrieveId = (token) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            attributes: [
                'id'
            ],
            where: {token: token}})
            .then((res) => {
                resolve(res[0]['id'])
            })
            .catch((err) => {
                reject()
            })
    })
}

exports.weatherParameters = (user) => {
    return new Promise((resolve, reject) => {
        Weather.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'cnt'],
                'city_name',
                'units',
                'language',
            ],
            where: {user_id: user}})
            .then((res) => {
                let result;
                let data = res[0]['dataValues'];
                if(data['cnt'] === 0){
                    result = false
                } else {
                    result = {
                        'city_name': data['city_name'],
                        'units': data['units'],
                        'language': data['language'],
                    }
                }
                resolve(result)
            })
            .catch((err) => {
                reject()
            })
    })
}

exports.covidParameters = (user) => {
    console.log(user)
    return new Promise((resolve, reject) => {
        Covid.findAll({
            attributes: [
                'country'
            ],
            where: {id_user: user}})
            .then((res) => {
                let result = [];
                res.forEach((r) => {
                    result.push(r['dataValues']['country'])
                })
                resolve(result)
            })
            .catch((err) => {
                reject()
            })
    })
}
