const db = require('../models/db');

formatCities = (cities) => {
    let cities_array = [];

    cities.forEach((city) => {
        cities_array.push(city.dataValues.city_name);
    })

    return cities_array;
}

exports.getCities = (userID) => {
    return new Promise((resolve, reject) => {
        db.Weather.findAll({
            attributes: ['city_name'],
            where: {
                user_id: userID
            }
        }).then(function(result) {
            resolve(formatCities(result))
        }).catch(() =>{
            reject()
        })
    })
}

exports.setCity = (userID, cityName, unit, lang) => {
    return new Promise((resolve, reject) => {
        db.Weather.create({
            user_id: userID,
            city_name: cityName,
            units: unit,
            language: lang
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

exports.removeCity = (userID, cityName) => {
    return new Promise((resolve, reject) => {
        db.Weather.destroy({
            where:{
                user_id: userID,
                city_name: cityName
            }
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

