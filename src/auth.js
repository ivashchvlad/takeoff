import axios from "axios";

const API_URL = "http://localhost:3001/";

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
            });
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
}

export default new Authentification()