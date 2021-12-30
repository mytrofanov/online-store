import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    try {
        const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }
}
export const login = async (email, password) => {
    try {
        const {data} = await $host.post('api/user/login', {email, password})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }


}
export const check = async () => {
    const response = await $host.post('api/user/registration')
    return response
}