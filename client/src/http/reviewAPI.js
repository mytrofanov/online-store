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
export const updateRating = async (rating) => {
    try {
        const {data} = await $authHost.post('api/review/rating', rating)
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchAllReviews = async () => {
    try {
        let {data} = await $host.get('api/review/get' )
        return data
    } catch (e) {
        console.log(e)
    }
}
export const fetchReviewsForOneDevice = async (deviceId) => {
    try {
        let {data} = await $host.get('api/review/getOneDev/' , {params:{deviceId}})
        return data
    } catch (e) {
        console.log(e)
    }
}
