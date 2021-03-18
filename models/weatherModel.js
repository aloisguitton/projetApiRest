const db = require('../models/db');

const axios = require('axios');

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

exports.getWeatherValues = (city, key) => {
    return new Promise((resolve, reject) => {
        const config = {
            method: 'get',
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&lang=fr&appid='+key,
            headers: { }
        };

        axios(config)
            .then(function (result) {
                resolve(result.data);
            })
            .catch(function (error) {
                reject();
            });
    });
}

exports.getUserModules = (cities, key) => {
    let modulesvalues = [];
    let value = '';

    return new Promise((resolve, reject) => {
        cities.forEach(async city => {
            modulesvalues.push(await this.getWeatherValues(city, key));
        })
        console.log(modulesvalues)
        resolve(modulesvalues);
    });
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

