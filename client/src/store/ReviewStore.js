import {makeAutoObservable} from "mobx";

export default class ReviewStore {
    constructor() {
        this._reviews = []
        this._oneDeviceReviews = []
        this._reviewsTotalCount = 0 //total quality of reviews
        makeAutoObservable(this)
    }

    setReviews(reviews) {
        this._reviews = reviews
    }

    setOneDeviceReviews (reviews) {
        this._oneDeviceReviews = reviews
    }

    setReviewsTotalCount(count) {
        this._reviewsTotalCount = count
    }

    get reviews() {
        return this._reviews
    }
    get oneDeviceReviews() {
        return this._oneDeviceReviews
    }
    get reviewsTotalCount() {
        return this._reviewsTotalCount
    }


}