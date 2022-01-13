import {$authHost, $host} from "./index";

export const putInBasket = async (deviceId, basketId) => {
    try {
        const {data} = await $authHost.post('api/basket/createBasket', {params:{deviceId, basketId}})
        return data
    } catch (e) {
        console.log(e)
    }
}
export const deleteFromBasket = async (Goods) => {
    try {
        const {data} = await $authHost.post('api/basket/delBasket', Goods)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const getBasket = async (basketId) => {
    try {
        const {data} = await $host.get('api/basket/getBasket', {params: {basketId}} )
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
