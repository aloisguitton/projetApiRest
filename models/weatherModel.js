const db = require('../models/db');


exports.test = (userID, cityName, unit, lang, collectedData) => {
    return new Promise((resolve, reject) => {
        db.Weather.create({
            user_id: 1,
            city_name: "France",
            units: "metric",
            language: "fr",
            data: "{json}"
        })
            .then(() => {
                resolve()
            })
            .catch((e) => {
                console.log(e)
                reject()
            })
    })

}

