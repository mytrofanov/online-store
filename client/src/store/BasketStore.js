import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketId = null
        this._basketVisible = false
        this._basketEmpty = true
        this._basketDevices = []
        this._askForBasket = false
        makeAutoObservable(this)
    }

    get basketId() {
        return this._basketId
    }
    setBasketId(id) {
        this._basketId = id
    }
    get basketEmpty() {
        return this._basketEmpty
    }
    setBasketEmpty(bool) {
        this._basketEmpty = bool
    }
    setAskForBasket(bool) {
        this._askForBasket = bool
    }
    get askForBasket() {
        return this._askForBasket
    }

    setBasketVisible(bool) {
        this._basketVisible = bool
    }

    get basketVisible() {
        return this._basketVisible
    }

    setBasketDevices(devices) {
        this._basketDevices = devices
    }

    get basketDevices() {
        return this._basketDevices
    }


}