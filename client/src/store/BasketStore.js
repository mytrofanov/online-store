import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketVisible = false
        this._basketDevices = []
        this._askForBasket = false
        makeAutoObservable(this)
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