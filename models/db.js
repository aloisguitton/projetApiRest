const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite:database.db");

const userModel = require('../models/userModel')

exports.User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fist_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    postal_code: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
});

exports.Covid = sequelize.define("covid", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    country: {
        type: Sequelize.STRING
    },
    id_user: {
        type: Sequelize.INTEGER
    }
});

this.User.sync({ force: true }).then(() => {
    userModel.register("user1", "lastname", "1a1dc91c907325c69271ddf0c944bc72", "test@gmail.fr", "2 rue de Mulhouse", "33200", "Bordeaux")
    //1a1dc91c907325c69271ddf0c944bc72 = md5("pass")
    console.log("User table created !")
})
