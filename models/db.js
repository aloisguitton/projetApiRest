const Sequelize = require("sequelize");

const sequelize = new Sequelize("sqlite:database.db");

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

this.User.sync({ force: true }).then(() => {console.log("User table created !")})