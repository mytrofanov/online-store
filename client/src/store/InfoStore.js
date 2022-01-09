import {makeAutoObservable} from "mobx";

export default class InfoStore {
    constructor() {
        this._info = ''
        this._infoVisible = false
        makeAutoObservable(this)
    }
    setInfo(info) {
        this._info = info
    }

    get info(){
        return this._info
    }
   setInfoVisible(bool) {
        this._infoVisible = bool
    }

    get infoVisible(){
        return this._infoVisible
    }

}