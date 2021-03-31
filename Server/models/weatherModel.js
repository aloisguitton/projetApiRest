const db = require('./db');

const axios = require('axios');

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
    /*return new Promise((resolve, reject) => {
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
    });*/

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                coord: { lon: -0.6413, lat: 44.8101 },
                weather: [{ id: 800, main: 'Clear', description: 'ciel dégagé', icon: '01d' }],
                base: 'stations',
                main: {temp: 8.26, feels_like: 4.29, temp_min: 7.78, temp_max: 8.89, pressure: 1028, humidity: 71},
                visibility: 10000,
                wind: { speed: 3.6, deg: 70 },
                clouds: { all: 0 },
                dt: 1616059805,
                sys: { type: 1, id: 6450, country: 'FR', sunrise: 1616047763, sunset: 1616091110 },
                timezone: 3600,
                id: 2987805,
                name: 'Pessac',
                cod: 200
            })
        }, 2000)
    })
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
