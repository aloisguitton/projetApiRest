const {News} =  require("../models/db");

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
