const {User} =  require("../models/db");

exports.getAllUsers = () => {
    User.create({
        fist_name: "user",
        last_name: "lastname",
        password: "pass",
        email: "email",
        address: "address",
        postal_code: "35440",
        city: "Bordeaux",
    })
}