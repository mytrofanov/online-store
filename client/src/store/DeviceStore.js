import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Смартфоны'}
        ]
        this._brands = [{id:1, name:'Samsung'},
            {id:2, name:'Apple'}]
        this._device = [{

        }]
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    getIsAuth() {
        return this._isAuth
    }

    getUser() {
        return this._user
    }


}