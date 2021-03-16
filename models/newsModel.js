const {News} =  require("../models/db");

exports.findAllUser = (idUser) => {
    console.log("finduserall")
    return new Promise((resolve, reject) => {
        News.findAll({where: {id_user: idUser}})
            .then((res) => {
                console.log(res)
                resolve(result)
            })
            .catch((err) => {
                reject()
            })
    })
}

exports.register = (id_user,country,category) => {
    return new Promise((resolve, reject) => {
        News.create({
            id_user: id_user,
            country: country,
            category: category
        })
            .then(() => {
                console.log("Creation réussi")
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject()
            })
    });
}

exports.registercountry = (id_user,country) => {
    return new Promise((resolve, reject) => {
        News.create({
            id_user: id_user,
            country: country,
        })
            .then(() => {
                console.log("Creation réussi")
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject()
            })
    });
}
