import {$authHost, $host} from "./index";

export const putInBasket = async (basketGoods) => {
    try {
        const {data} = await $authHost.post('api/createBasket', basketGoods)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const deleteFromBasket = async (Goods) => {
    try {
        const {data} = await $authHost.post('api/delBasket', Goods)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const getBasket = async (basketId) => {
    try {
        const {data} = await $host.get('api/getBasket', basketId )
        return data
    } catch (e) {
        console.log(e)
    }
}
