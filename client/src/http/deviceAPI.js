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
        const {data} = await $host.get('api/brand',)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const createDevice = async (device) => {
    try {
        const {data} = await $authHost.post('api/device', device)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchDevices = async (typeId, brandId, page, limit = 10) => {
    try {
        const {data} = await $host.get('api/device', {params:{
                typeId, brandId, page,limit
            }} )
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchOneDevice = async (id) => {
    try {
        const {data} = id !== undefined && await $host.get('api/device/' + id )
        return data
    } catch (e) {
        console.log(e)
    }
}

