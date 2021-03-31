const db = require("../models/db");

exports.findAllUser = (userID) => {
    return new Promise((resolve, reject) => {
        db.News.findAll({
            attributes: ['country', 'category'],
            where: {id_user: userID}
        })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log("passage par faux")
                reject()
            })
    })
}

exports.register = (userID, country, category) => {
    return new Promise((resolve, reject) => {
        db.News.create({
            id_user: userID,
            country: country,
            category: category
        })
            .then((e) => {
                resolve()
            })
            .catch(error => {
                reject()
            })
    });
}

exports.delete = (userID) => {
    return new Promise((resolve, reject) => {
        db.News.destroy({
            where: {
                id_user: userID,
            }
        })
            .then((e) => {
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject()
            })
    });
}