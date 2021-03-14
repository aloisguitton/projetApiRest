const {Covid} =  require("../models/db");

exports.register = (country, id_user) => {
    return new Promise((resolve, reject) => {
        Covid.create({
            country: country,
            id_user: id_user
        })
            .then(() => {
                console.log("lkdfuvidunviurniuvnird")
                resolve()
            })
            .catch(error => {
                console.log(error)
                //reject()
            })
    });
}