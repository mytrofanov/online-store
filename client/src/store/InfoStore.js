import {makeAutoObservable} from "mobx";

export default class InfoStore {
    constructor() {
        this._infoAuth = ''
        this._infoAuthVisible = false
        this._infoShop = ''
        this._infoShopVisible = false
        makeAutoObservable(this)
    }
    // info-messages from AuthPage
    setInfoAuth(info) {
        this._infoAuth = info
    }
    get infoAuth(){
        return this._infoAuth
    }
   setInfoAuthVisible(bool) {
        this._infoAuthVisible = bool
    }
    get infoAuthVisible(){
        return this._infoAuthVisible
    }

    // info-messages from ShopPage
    setInfoShop(info) {
        this._infoShop = info
    }
    get infoShop(){
        return this._infoShop
    }
   setInfoShopVisible(bool) {
        this._infoShopVisible = bool
    }

    get infoShopVisible(){
        return this._infoShopVisible
    }

}