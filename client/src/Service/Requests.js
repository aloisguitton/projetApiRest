import axios from 'axios'
import {store} from "../Store/store"
const server = process.env.REACT_APP_SERVER

const deconnect = () => {
    const action = {type: "DISCONNECT", value: {}}
    store.dispatch(action)
}
export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const user = store.getState()['authReducer']
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
                if(e.response.data.error === "Unauthorized: token error1" || e.response.data.error === "Unauthorized: token expired"){
                    deconnect()
                }
                reject(e.response.data)
            })
    })
};

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        let user = {}
        try {
            user = store.getState()['authReducer']
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
                if(e.message === "Network error" || e.response.data.error === "Unauthorized: token error1" || e.response.data.error === "Unauthorized: token expired"){
                    deconnect()
                }

                reject(e.response.data)
            })
    })
};

export const del = (url, data) => {
    return new Promise((resolve, reject) => {
        const user = store.getState()['authReducer']
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
                if(e.response.data.error === "Unauthorized: token error1" || e.response.data.error === "Unauthorized: token expired"){
                    deconnect()
                }
                reject(e.response.data)
            })
    })
};

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const user = store.getState()['authReducer']
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
                if(e.response.data.error === "Unauthorized: token error1" || e.response.data.error === "Unauthorized: token expired"){
                    deconnect()
                }
                reject(e.response.data)
            })
    })
}