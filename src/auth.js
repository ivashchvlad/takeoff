import axios from "axios"
import React from 'react'

const API_URL = "http://localhost:3001/"

class Authentification {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            }).catch(e => console.log(e));
    }
    signup(email, password) {
        return axios.post(API_URL + "signup", {
            email,
            password
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    isLoggedIn() {
        return !!JSON.parse(localStorage.getItem("user"))
    }
    getJWT() {
        return this.isLoggedIn() ? 
            JSON.parse(localStorage.getItem("user")).accessToken :
            null
    } 
}

export const AuthContext = React.createContext({})

export default new Authentification()
