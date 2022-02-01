import {$authHost, $host} from "./index";

export const createReview = async (review) => {
    try {
        const {data} = await $authHost.post('api/review', review)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const deleteReview = async (id) => {
    try {
        const {data} = await $authHost.post('api/review/del', id)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchReviews = async (deviceID) => {
    try {
        let {data} = await $host.get('api/review/get', deviceID )
        return data
    } catch (e) {
        console.log(e)
    }
}
