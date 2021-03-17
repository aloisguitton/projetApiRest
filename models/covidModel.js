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

exports.checkExists = (country, id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.findAll({where: {id_user: id_user, country: country}}).
            then(responses => {
                if(responses.length === 0){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
        })
            .catch(()=>{
                reject();
            })
    });
}

exports.getUserModules = (id_user) => {
    return new Promise((resolve, reject) => {
        db.Covid.findAll({where: {id_user: id_user}}).
            then(responses => {
                resolve(responses);
            })
            .catch(()=>{
                reject();
            })
    });
}