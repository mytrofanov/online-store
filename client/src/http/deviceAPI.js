import {$authHost, $host} from "./index";

export const createType = async (type) => {
    try {
        const {data} = await $authHost.post('api/type', type)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const deleteType = async (type) => {
    try {
        const {data} = await $authHost.post('api/type/del', type)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchTypes = async () => {
    try {
        let {data} = await $host.get('api/type' )
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
export const deleteBrand = async (brand) => {
    try {
        const {data} = await $authHost.post('api/brand/del', brand)
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
export const updateDevice = async (device) => {
    try {
        const {data} = await $authHost.post('api/device/update', device)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const deleteDevice = async (id) => {
    try {
        const {data} = await $authHost.post('api/device/del', id)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchDevices = async (typeId, brandId, page, limit, expensive, cheap ) => {
    try {
        const {data} = await $host.get('api/device', {params:{
                typeId, brandId, page,limit, expensive, cheap
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

export const updateInfo = async (info) => {
    try {
        const {data} = await $authHost.post('api/device/updateInfo', info)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const createInfo = async (info) => {
    try {
        const {data} = await $authHost.post('api/device/createInfo', info)
        return data
    } catch (e) {
        console.log(e)
    }
}

export class fetchExpensiveDevices {
}