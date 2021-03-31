const db = require("../models/db");

exports.findAllUser = (idUser) => {
    return new Promise((resolve, reject) => {
        db.News.findAll({
            attributes: ['id_user', 'country','category'],
            where: {id_user: idUser}
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

exports.register = (id_user, country,category) => {
    return new Promise((resolve, reject) => {
        db.News.create({
            id_user: id_user,
            country: country,
            category: category
        })
            .then(() => {
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject()
            })
    });
}
