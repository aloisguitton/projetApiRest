const db = require('../models/db');

const axios = require('axios');

exports.getCities = (userID) => {
    console.log(userID)
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

    return new Promise(async (resolve, reject) => {
        for(let i = 0; i<cities.length; i++){
            modulesvalues.push(setDataFormat(await this.getWeatherValues(cities[i], key)));
        }
        resolve(modulesvalues);
    });
}

exports.setCity = (userID, cityName, unit, lang) => {
    console.log(cityName)
    return new Promise((resolve, reject) => {
        db.Weather.create({
            user_id: userID,
            city_name: cityName,
            units: unit,
            language: lang
        })
            .then((e) => {
                resolve()
            })
            .catch((c) => {
                console.log("----------------------------------")
                console.log(c)
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

function formatCities(cities){
    let cities_array = [];

    cities.forEach((city) => {
        cities_array.push(city.dataValues.city_name);
    })

    return cities_array;
}

function getTime(timestamp){

    let date = new Date(timestamp*1000);

    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);

    return formattedTime;
}

function setDataFormat(data){

    const formattedData =
        {
            weather:{
                city: data.name,
                sky:{
                    main: data.weather[0]['main'],
                    description: data.weather[0]['description']
                },
                condition:{
                    temperature: data.main.temp,
                    humidity: data.main.humidity
                },
                wind:{
                    speed: data.wind.speed,
                    degree: data.wind.deg
                },
                sun:{
                    sunrise: getTime(data.sys.sunrise),
                    sunset: getTime(data.sys.sunset)
                }
            }
        }

    return formattedData;
}
