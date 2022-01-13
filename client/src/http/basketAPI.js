import {$authHost, $host} from "./index";

export const putInBasket = async (basket) => {
    try {
        const {data} = await $authHost.post('api/basket/createBasket', basket)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const delOneFromBasket = async (device) => {
    try {
        const {data} = await $authHost.post('api/basket/delBasket', device)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const clearBasket = async (basketId) => {
    try {
        const {data} = await $authHost.post('api/basket/clearBasket', {params: {basketId}})
        return data
    } catch (e) {
        console.log(e)
    }
}
export const delSingleFromBasket = async (id) => {
    try {
        const {data} = await $authHost.post('api/basket/delSingleBasket', id)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const getBasket = async (basketId) => {
    try {
        const {data} = await $authHost.get('api/basket/getBasket', {params: {basketId}} )
        return data
    } catch (e) {
        console.log(e)
    }
}
export const getBasketId = async (userId) => {
    try {
        const {data} = await $host.get('api/basket/', {params: {userId}} )
        return data
    } catch (e) {
        console.log(e)
    }
}
