import {$authHost, $host} from "./index";

export const createType = async (type) => {
    try {
        const {data} = await $authHost.post('api/type', type)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchTypes = async () => {
    try {
        const {data} = await $host.get('api/type' )
        return data
    } catch (e) {
        console.log(e)
    }
}

export const createBrand = async (brand) => {
    try {
        const {data} = await $authHost.post('api/brand', brand)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchBrands = async () => {
    try {
        const {data} = await $host.get('api/brand' )
        return data
    } catch (e) {
        console.log(e)
    }
}

