const db =  require("../models/db");

exports.register = (country, id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.create({
            country: country,
            id_user: id_user
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    });
}

exports.delete = (country, id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.destroy({where: {id_user: id_user, country: country}})
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    });
}
