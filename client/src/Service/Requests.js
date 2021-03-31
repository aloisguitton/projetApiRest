import axios from 'axios'

const server = process.env.REACT_APP_SERVER

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const user = JSON.parse((JSON.parse(localStorage['persist:root']))['authReducer'])
        console.log(user)
        const isLogged = user['loggedIn'] === true
        if(isLogged){
            if(data instanceof FormData){
                data.append("token", (user['user']).replaceAll("\"", ""))
            } else {
                data['token'] = (user['user']).replaceAll("\"", "")
            }
        }

        let config = {
            method: 'post',
            url: server + url,
            headers: {
                'Content-Type': 'application/json',
                'authorization': isLogged ? (user['token']).replaceAll("\"", "") : null
            },
            data: data
        };

        axios(config)
            .then((response) => {
                resolve(response)
            })
            .catch((e) => {
                reject(e.response.data)
            })
    })
};

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        let user = {}
        try {
            user = JSON.parse((JSON.parse(localStorage['persist:root']))['authReducer'])
        } catch (e) {}
        const isLogged = user['loggedIn'] === true
        if(isLogged){
            params["token"] = (user['user']).replaceAll("\"", "")
        }
        let config = {
            method: 'get',
            url: server + url,
            headers: {
                'authorization': isLogged ? (user['token']).replaceAll("\"", "") : null
            },
            params: params
        };

        axios(config)
            .then((response) => {
                resolve(response)
            })
            .catch((e) => {
                reject(e.response.data)
            })
    })
};

export const del = (url, data) => {
    return new Promise((resolve, reject) => {
        const user = JSON.parse((JSON.parse(localStorage['persist:root']))['authReducer'])
        const isLogged = user['loggedIn'] === true
        if(isLogged){
            data["token"] = (user['user']).replaceAll("\"", "")
        }
        let config = {
            method: 'delete',
            url: server + url,
            headers: {
                'Content-Type': 'application/json',
                'authorization': isLogged ? (user['token']).replaceAll("\"", "") : null
            },
            data: data
        };

        axios(config)
            .then((response) => {
                resolve(response)
            })
            .catch((e) => {
                reject(e.response.data)
            })
    })
};

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const user = JSON.parse((JSON.parse(localStorage['persist:root']))['authReducer'])
        const isLogged = user['loggedIn'] === true
        if(isLogged){
            data["token"] = (user['user']).replaceAll("\"", "")
        }
        let config = {
            method: 'put',
            url: server + url,
            headers: {
                'Content-Type': 'application/json',
                'authorization': isLogged ? (user['token']).replaceAll("\"", "") : null
            },
            data: data
        };

        axios(config)
            .then((response) => {
                resolve(response)
            })
            .catch((e) => {
                console.log(e)
                reject(e.response.data)
            })
    })
};