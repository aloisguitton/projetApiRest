const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite:database.db");

const userModel = require('./userModel')
const covidModel = require('./covidModel')
const weatherModel = require('./weatherModel')
const newsModel = require('./newsModel')

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
    token: {
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

exports.Weather = sequelize.define("weather", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    city_name: {
        type: Sequelize.STRING
    },
    units: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.STRING
    }
});

exports.News = sequelize.define("news", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER
    },
    country: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
});

this.User.sync({ force: true }).then(() => {
    userModel.register("user1", "lastname", "1a1dc91c907325c69271ddf0c944bc72", "test@gmail.fr", "2 rue de Mulhouse", "33200", "Bordeaux")
    //1a1dc91c907325c69271ddf0c944bc72 = md5("pass")
    console.log("User table created !")
})

this.Covid.sync({ force: true }).then(() => {
    console.log("Covid table created !")
})

this.News.sync({ force: true }).then(() => {
  //  newsModel.register(1,"fr","technology");
    console.log("News table created !")
})

this.Weather.sync({ force: true }).then(() => {
    //weatherModel.createWeatherTable(1, "France","metric","fr","{json}");
    console.log("Weather table created !")
})
