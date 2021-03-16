const {User} =  require("../models/db");

exports.register = (firstName, lastName, pass, email, city, zip, addr) => {
    console.log(User)
    return new Promise((resolve, reject) => {
        User.create({
            fist_name: firstName,
            last_name: lastName,
            password: pass,
            email: email,
            address: addr,
            postal_code: zip,
            city: city,
        })
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })

}

