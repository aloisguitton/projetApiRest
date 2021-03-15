const {Weather} =  require("../models/db");

exports.register = (userID, cityName, unit, lang) => {
    return new Promise((resolve, reject) => {
        Weather.create({
            user_id: userID,
            city_name: cityName,
            units: unit,
            language: lang,
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })

}

