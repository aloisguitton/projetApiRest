const db = require('../models/db');


exports.setCity = (userID, cityName, unit, lang) => {
    return new Promise((resolve, reject) => {

        db.Weather.create({
            user_id: userID,
            city_name: cityName,
            units: unit,
            language: lang
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
    })
}

