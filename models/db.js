const Sequelize = require("sequelize");

const sequelize = new Sequelize("sqlite:database.db");

exports.User = sequelize.define("user", {
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

this.User.sync({ force: true }).then(() => {console.log("User table created !")})