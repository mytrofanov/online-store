import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password, role) => {
    try {
        const {data} = await $host.post('api/user/registration', {email, password, role})
        localStorage.setItem('token', data.token)
         return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }
}
export const login = async (email, password) => {
    try {
        const response = await $host.post('api/user/login', {email, password})
        localStorage.setItem('token', response.data.token)
        return jwtDecode(response.data.token)
    } catch (e) {
        if(e.response.status === 403) {
            return e.response
        }
    }


}
export const check = async () => {
    try {
         const {data} =  await $authHost.get('api/user/auth')
            .catch(function (error) {
                if (error.response) {
                    const {message} = error.response.data
                    const status = error.response.status
                    if (status === 401) {
                        console.log(message + ', status: ' + status)
                    }
                    console.log(error.response)
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("request:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error-message:", error.message);
                }
            })
        if (data.token) {
            localStorage.setItem('token', data.token)
            return jwtDecode(data.token)
        }
    } catch (e) {
        console.log(e)
    }

}