import {makeAutoObservable} from "mobx";

export default class InfoStore {
    constructor() {
        this._infoAuth = ''
        this._infoAuthVisible = false
        makeAutoObservable(this)
    }
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

}